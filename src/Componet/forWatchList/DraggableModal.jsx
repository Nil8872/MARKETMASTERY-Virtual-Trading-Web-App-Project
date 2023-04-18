import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Draggable from "react-draggable";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import * as Yup from 'yup';
import {useFormik} from 'formik';
const baseUrl = "http://localhost:5000";
const token = localStorage.getItem("token"); 



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

const getshare = async() =>{
  const share = await fetch(`${baseUrl}/api/share/get`, {
    method : "GET",
    headers: {
      "Content-Type" : "application/json",
      "auth-token" : token,
    }
  })

  const result =  await share.json() 
  console.log(result)
  return result
}


function DraggableModal(props) { 
  const { action, open, handleclose, sharename, lastprice } = props; 

  
 useEffect(()=>{
  // getshare()

 },[])
  const initialValues = {
    price : lastprice,
    qty : 1,
    intraInvest : "Intraday",
    limitMarket : "",}
  const {handleChange, handleSubmit, values} = useFormik({
    initialValues,
    onSubmit: async(values)=>{
      const buySellShare = {...values, action, sharename}
       
      try {  
        const option = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token":
          token,
            
          },
          body: JSON.stringify(buySellShare),
        }; 
    try {
      const response = await fetch(`${baseUrl}/api/share/add`, option);
      const result = await response.json() 
      
    } catch (error) {
      console.log(error);
      
    }
    handleclose();

      } catch (error) {
        
      }
    }
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
            <div className="footerbtns">
              <div className="calMargin">
                Required margin{" "}
                <span>{action == "Sell" ? 0 : (values.price * values.qty).toFixed(3)}</span>
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
                <Button onClick={handleclose} variant="outlined" color="error">
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
