import React, { useContext } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles"; 
import { useFormik } from "formik"; 
 
import ShareContext from "../../Context/ShareContext";

const useStyles = makeStyles({
  smallButton: {
    width: "30px",
    padding: "0px",
    margin: "0px",
    height: "28px",
  },
});

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

  const {setShareCount, addShare, shares, updateShare} = useContext(ShareContext); 
  const { action, open, handleclose, sharename, lastprice } = props; 

  const initialValues = {
    price: lastprice,
    qty: 1,
    intraInvest: "Intraday",
    limitMarket: "Market",
  };

  const { handleChange, handleSubmit, values } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      const buySellShare = { ...values, action, sharename }; 

      //  console.log(shares)
      let dubble = false;
      let shareId;
      let oldPrice ;
      let oldQty ;
      shares.map((item)=>{
        if(item.sharename === sharename){
          dubble= true;
          shareId = item._id;
          oldPrice = item.price;
          oldQty = item.qty;
        }
      })

      if(dubble){
        const price = values.price
        const qty = values.qty;
        values.qty += oldQty;
        // values.price = ((values.price + oldPrice)/2).toFixed(2);
        const shareUpdateData = {...values, sharename, action }
        updateShare(shareId,price,  qty, action, shareUpdateData);
        setShareCount(c=>c+1);
        handleclose();
      } 
      else{

        addShare(values.price, values.qty, action, buySellShare);
        setShareCount(c=>c+1);
        handleclose();
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
                <div>Price: ₹{values.price}</div>
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
                    value={values.price}
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
                      : (values.price * values.qty).toFixed(3)}
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
    </>
  );
}

export default DraggableModal;
