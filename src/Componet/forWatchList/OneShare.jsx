import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles"; 
import DraggableModal from "./DraggableModal";

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

function OneShare(props) {
  const { sharename, absoluteprice, percentegeprice, lastprice } = props;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleOpen1 = () => setOpen1(true);
  const handleClose = () => setOpen(false);
  const handleClose1 = () => setOpen1(false);

  return (
    <>
    <DraggableModal action={"Buy"} sharename={sharename}  open={open} lastprice={lastprice} handleclose={handleClose}/>
    <DraggableModal action={"Sell"} sharename={sharename} open={open1} lastprice={lastprice} handleclose={handleClose1}/>
       


       
      <div className="share-list" style={{ fontSize: "14px" }}>
        <div className="share" >
          <div className="symbol-wrapper">
            <div
            // ref={shareName}
              style={{ color: "rgba(255,255,255, 0.7)" }}
              className="shareName"
            >
              {sharename}
            </div>
            <div className="buySell">
              <div style={{ display: "flex" }}> 
                <Button
                  onClick={handleOpen}
                  className={classes.smallButton}
                  style={{ marginRight: "10px" }}
                  color="success"
                  variant="contained"
                  size="small"
                >
                  Buy
                </Button>
                <Button
                  onClick={handleOpen1}
                  className={classes.smallButton}
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Sell
                </Button>
              </div>
            </div>
          </div>
          <div className="price-wrapper">
            <div className="price-change">
              <div className="dim">
                <span style={{ color: "green" }} className="price-absolute">
                  {absoluteprice}
                </span>
                <span
                  className="price-percentage"
                  style={{ color: "rgba(255,255,255, 0.7)" }}
                >
                  {percentegeprice}
                  <span className="text-xxsmall">%</span>
                </span>
              </div>
            </div>
            <div className="price">
              <span style={{ color: "green" }} className="last-price">
                {lastprice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneShare;
