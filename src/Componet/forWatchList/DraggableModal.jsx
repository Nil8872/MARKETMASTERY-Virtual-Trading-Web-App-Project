import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { useFormik } from "formik";
import { ToastContainer, toast } from "react-toastify";
import ShareContext from "../../Context/ShareContext";
import UserContext from "../../Context/UserContex";
import OrederExecuteContext from "../../Context/OrederExecuteContext";
import OpenOrderContext from "../../Context/OpenOrderContext";
import RealTimeDataContext from "../../Context/RealTimeDataContext";
import moment from "moment"; 

const useStyles = makeStyles({
  smallButton: {
    width: "30px",
    padding: "0px",
    margin: "0px",
    height: "28px",
  },
});

const toastedStyle = {
  position: "top-right",
  theme: "colored",
  autoClose: 3000,
};

function CustomBackdrop(props) {
  const classes = useStyles();
  return <div className={classes.backdrop} {...props} />;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 550,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
};

function DraggableModal(props) {

  const {sharePrices} = useContext(RealTimeDataContext); 

  const { setShareCount, addShare, shares, updateShare } =
    useContext(ShareContext);
  const {addOpenOrder, setOpenOrderCount} = useContext(OpenOrderContext);
  const { action, open, handleclose, sharename, lastprice } = props;
  const { user,updateUser, setUserCount } = useContext(UserContext);
  const { setExeOrderCount, addExeOreder } = useContext(OrederExecuteContext); 
  const id = user._id;

  const initialValues = {
    price: lastprice,
    qty: 1,
    intraInvest: "Intraday",
    limitMarket: "Market",
  };


  const getShareLTP = (sharename)=>{ 
    if((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0]){
      return (((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0].ltp).toFixed(2))
    }
  }



  const updateUserWithData = async(price,qty) =>{
    let prevused = parseInt(user.usedMargin);
    let avail;
    const used = price * qty;
    prevused = prevused + used;
    avail = user.availMargin - used;
    const updatedData = {
      ...user,
      usedMargin: prevused.toFixed(2),
      availMargin: avail.toFixed(2),
    };
    await updateUser(id, updatedData);
    setUserCount((e) => e + 1);
  }




  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const buySellShare = { ...values, action, sharename };

      let dubble = false;
      let shareId;
      let oldPrice;
      let oldQty;
      let oldSharename;

      shares.map((item) => {
        if (item.sharename === sharename && item.action === action) {
          dubble = true;
          shareId = item._id;
          oldPrice = item.price;
          oldQty = item.qty;
          oldSharename = item.sharename;
        }
      });

      if (dubble) {
        // if (user.availMargin > values.price * values.qty) {
          console.log(getShareLTP(sharename))
        if (user.availMargin > getShareLTP(sharename) * values.qty) {
          const qty = values.qty;
          values.qty += oldQty;
 
          const price = (getShareLTP(oldSharename) * qty + oldPrice *oldQty)/values.qty;

          const shareUpdateData = { ...values, sharename, action, price };
          if (values.limitMarket === "Market") {
            await updateShare(shareId, price, qty, action, shareUpdateData);

            await updateUserWithData(price, qty);

            toast.success(
              `${sharename} X ${qty} ${action} Successfully!`,
              toastedStyle
            );

            const newQty = `${qty}/${qty}`;
            const executeOrderData = {
              ...buySellShare,
              status: "Completed",
              qty: newQty,
              time: moment().format("LTS"),
            };

            addExeOreder(executeOrderData);
            setExeOrderCount((c) => c + 1);
            setShareCount((c) => c + 1);
            handleclose();

          } 
          else {
            const qty = `0/${values.qty}`;
            const openOrderData = {
              ...buySellShare,
              qty,
              status: "Open",
              time: moment().format("LTS"),
              price: getShareLTP(sharename)
            };

            addOpenOrder(openOrderData);
            toast.success(
              `${sharename} X ${qty} ${action} Order Place Successfully!`,
              toastedStyle
            );
            setOpenOrderCount(c=>c+1);
            handleclose();
          }
        } else {
          toast.error(
            "Order Rejected due to Insufficient Balanace",
            toastedStyle
          );
          const qty = `0/${values.qty}`;
          const executeOrderData = {
            ...buySellShare,
            status: "Rejected",
            qty,
            time: moment().format("LTS"),
            price: getShareLTP(sharename)
          };
          addExeOreder(executeOrderData);
          setExeOrderCount((c) => c + 1);
          handleclose();
        }
      } else {
        if (user.availMargin > getShareLTP(sharename) * values.qty) {
          if(values.limitMarket === 'Market'){

    
          addShare(values.price, values.qty, action, {...buySellShare, price: getShareLTP(sharename)});
          await updateUserWithData(getShareLTP(sharename), values.qty);

          toast.success(
            `${sharename} X ${values.qty} ${action} Successfully!`,
            toastedStyle
          );
          const qty = `${values.qty}/${values.qty}`;
          const executeOrderData = {
            ...buySellShare,
            status: "Completed",
            qty,
            time: moment().format("LTS"),
            price : getShareLTP(sharename),
          };
          addExeOreder(executeOrderData);
          setExeOrderCount((c) => c + 1);
          setShareCount((c) => c + 1);
          handleclose();
        }
        else{
          const qty = `0/${values.qty}`;
            const openOrderData = {
              ...buySellShare,
              qty,
              status: "Open",
              time: moment().format("LTS"),
              price : getShareLTP(sharename),
            };

            addOpenOrder(openOrderData);
            toast.success(
              `${sharename} X ${qty} ${action} Order Place Successfully!`,
              toastedStyle
            );
            setOpenOrderCount(c=>c+1);
            handleclose();
        }
        } else {
          toast.error(
            "Order Rejected due to Insufficient Balanace",
            toastedStyle
          );
          const qty = `0/${values.qty}`;
          const executeOrderData = {
            ...buySellShare,
            status: "Rejected",
            qty,
            time: moment().format("LTS"),
            price : getShareLTP(sharename),
          };
          addExeOreder(executeOrderData);
          setExeOrderCount((c) => c + 1);
          handleclose();
        }
      }
    },
  });
  return (
    <>
      <Draggable>
        <Modal
          BackdropComponent={CustomBackdrop}
          {...props}
          open={open}
          onClose={handleclose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <form action="" onSubmit={handleSubmit}>
            <Box sx={style}>
              <div
                style={{
                  padding: "15px",
                  backgroundColor: action === "Buy" ? "#0288d1" : "#d32f2f",
                  borderRadiusTopLeft: "5px",

                  color: "white",
                }}
                className="buyHeading"
              >
                <span style={{ fontWeight: 700, fontSize: "20px" }}>
                  {action} {sharename} x {values.qty} Qty.
                </span>
                <div>Price: ₹{getShareLTP(sharename)}</div>
              </div>
              <div
                className="categary"
                style={{ fontSize: "16px", fontWeight: 400 }}
              >
                <div className="intraday">
                  <div className="intraInvest">
                    <input
                      checked={values.intraInvest === "Intraday"}
                      value="Intraday"
                      onChange={handleChange}
                      type="radio"
                      name="intraInvest"
                      style={{ transform: "scale(1.2)" }}
                      id="Intra"
                    />
                    <label htmlFor="Intra">Intraday</label>
                  </div>
                  <TextField
                    onChange={handleChange}
                    style={{ width: "200px" }}
                    id="outlined"
                    value={values.qty}
                    name="qty"
                    label={
                      <span style={{ fontSize: "20px", fontWeight: 600 }}>
                        Qty.
                      </span>
                    }
                    type="number"
                  />
                </div>
                <div className="longterm">
                  <div className="intraInvest">
                    <input
                      value="Longterm"
                      onChange={handleChange}
                      type="radio"
                      name="intraInvest"
                      style={{ transform: "scale(1.2)" }}
                      id="Invest"
                    />
                    <label htmlFor="Invest">Longterm</label>
                  </div>
                  <TextField
                    style={{ width: "200px" }}
                    id="outlined-required1"
                    label={
                      <span style={{ fontSize: "20px", fontWeight: 600 }}>
                        Price
                      </span>
                    }
                    disabled={values.limitMarket === "Market"}
                    value={getShareLTP(sharename)}
                    name="price"
                    onChange={handleChange}
                    type="number"
                  />

                  <div className="limitMarket">
                    <div className="limit">
                      <input
                        onChange={handleChange}
                        value="Limit"
                        type="radio"
                        name="limitMarket"
                        style={{ transform: "scale(1.2)" }}
                        id="limit"
                      />
                      <label htmlFor="limit">Limit</label>
                    </div>

                    <div className="market">
                      <input
                        checked={values.limitMarket === "Market"}
                        value="Market"
                        onChange={handleChange}
                        type="radio"
                        name="limitMarket"
                        style={{ transform: "scale(1.2)" }}
                        id="market"
                      />
                      <label htmlFor="market">Market</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="footerbtns" style={{ borderRadius: "5px" }}>
                <div className="calMargin">
                  Required margin{" "}
                  <span>
                    {action == "Sell"
                      ? 0
                      : (getShareLTP(sharename) * values.qty).toFixed(3)}
                  </span>
                </div>

                <div className="buttons">
                  <Button
                    style={{ marginRight: "10px" }}
                    variant="contained"
                    color={action == "Buy" ? "info" : "error"}
                    type="submit"
                  >
                    {action}
                  </Button>
                  <Button
                    onClick={handleclose}
                    variant="outlined"
                    color="error"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Box>
          </form>
        </Modal>
      </Draggable>
      <ToastContainer />
    </>
  );
}

export default DraggableModal;
