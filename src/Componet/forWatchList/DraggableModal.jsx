import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";

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
  const [qty, setQty] = useState(1);
  const { action, open, handleclose, sharename, lastprice } = props;
  const [price, setPrice] = useState(lastprice);
  const [checked, setChecked] = useState(true);
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
                {action} {sharename} x {qty} Qty.
              </span>
              <div>Price: ₹{lastprice}</div>
            </div>
            <div
              className="categary"
              style={{ fontSize: "16px", fontWeight: 400 }}
            >
              <div className="intraday">
                <div className="intraInvest">
                  <input
                    checked={checked}
                    onChange={()=>setChecked(!checked)}
                    // onClick={setChecked(!checked)}
                    type="radio"
                    name="intraInvest"
                    style={{ transform: "scale(1.2)" }}
                    id="Intra"
                  />
                  <label htmlFor="Intra">Intraday</label>
                </div>
                <TextField
                  onChange={(e) => setQty(e.target.value)}
                  inputProps={{ min: 1 }}
                  style={{ width: "200px" }}
                  id="outlined"
                  value={qty}
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
                    type="radio"
                    name="intraInvest"
                    style={{ transform: "scale(1.2)" }}
                    id="Invest"
                  />
                  <label htmlFor="Invest">Longterm</label>
                </div>
                <TextField
                  inputProps={{ min: 1 }}
                  style={{ width: "200px" }}
                  id="outlined-required1"
                  label={
                    <span style={{ fontSize: "20px", fontWeight: 600 }}>
                      Price
                    </span>
                  }
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="number"
                />

                <div className="limitMarket">
                  <div className="limit">
                    <input
                    checked={checked}
                    onChange={()=>setChecked(!checked)}
                      type="radio"
                      name="limitMarket"
                      style={{ transform: "scale(1.2)" }}
                      id="limit"
                    />
                    <label htmlFor="limit">Limit</label>
                  </div>

                  <div className="market">
                    <input
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
            <div className="footerbtns">
              <div className="calMargin">
                Required margin{" "}
                <span>{action == "Sell" ? 0 : (price * qty).toFixed(3)}</span>
              </div>

              <div className="buttons">
                <Button
                  style={{ marginRight: "10px" }}
                  variant="contained"
                  color={action == "Buy" ? "info" : "error"}
                >
                  {action}
                </Button>
                <Button onClick={handleclose} variant="outlined" color="error">
                  Cancel
                </Button>
              </div>
            </div>
          </Box>
        </Modal>
      </Draggable>
    </>
  );
}

export default DraggableModal;
