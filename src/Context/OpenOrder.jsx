import React, { useState, useEffect, useContext } from "react";
import OpenOrderContext from "./OpenOrderContext";
import RealTimeDataContext from "./RealTimeDataContext";
import ShareContext from "./ShareContext";

const baseUrl = "http://localhost:5000"
const token = localStorage.getItem("token");

function OpenOrder(props) {
  const [openOrders, setOpenOrders] = useState([]);
  const [openOrderCount, setOpenOrderCount] = useState(0);
  const {sharePrices} = useContext(RealTimeDataContext);
  const {addShare, setShareCount} = useContext(ShareContext);
  const [timer, setTimer] = useState(null);
  const [count, setCount] = useState(0);

  
  useEffect(() => {
    if (!token) {
    } else {
      getOpenOrders();
    }
  }, [openOrderCount]);
  
  useEffect(()=>{
    // console.log("UseEffect Is called from OpenOrder.jsx");
    if(!token){
      
    }
    else{
      // console.log("CheckForLimit is run!");
      if (openOrders && !timer) { 
        setTimer(
          
          setInterval(() => {  
            openOrders.map(async (order) => { 
              setCount((c) => c + 1);
              const range = [0.0, 0.5]; 
              const difference = Math.abs(
                getShareLTP(order.sharename) - order.price
                ); 
              // console.log(difference);
              // console.log(difference >= range[0] && difference <= range[1])
  
              if (difference >= range[0] && difference <= range[1]) {
                console.log(order._id);
                await cancleOrder(order._id);
                setOpenOrderCount((c) => c + 1);  
                
                let qty = order.qty.split("/")[1];
                let intraInvest = "Intraday";
                let limitMarket = "Limit";
                try {
                  if (order._id) {
                    await addShare({ ...order, qty, intraInvest, limitMarket });
                    setShareCount((c) => c + 1);
                    
                  }
                } catch (error) {
                  console.log(error);
                }
              }
            });
          }, 1000)
          );
        } 
        return () => {
          if (timer) {
            clearInterval(timer); 
            setTimer(null);
          }
        };
       
    }
  },[openOrders, timer, count])
  const getOpenOrders = async () => {
    const option = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      },
    };

    try {
      const data = await fetch(`${baseUrl}/api/openOrder/getOpenOrder`, option);
      const openOrderData = await data.json();
      setOpenOrders(openOrderData);
      
    } catch (error) {
      console.log(error);
    }
  };

  //   function for add Open order  in dataBase
  const addOpenOrder = async (orderData) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(orderData),
    };

    try {
      const result = await fetch(`${baseUrl}/api/openOrder/add`, option);
      console.log(await result.json());
    } catch (error) {
      console.log(error);
    }
  };

  const cancleOrder = async(id)=>{
    const option = {
      method : 'DELETE',
      headers : {
        "Content-type": "application/json",
        "auth-token": token,
      }
    }

    try {

      await fetch(`${baseUrl}/api/openOrder/cancle/${id}`, option);
 
    } catch (error) {
      
    }

  }


  const getShareLTP = (sharename) => { 
    if (
      sharePrices.filter((dataShare) => {
        return dataShare.sharename === sharename;
      })[0]
    ) {
      return sharePrices
        .filter((dataShare) => {
          return dataShare.sharename === sharename;
        })[0]
        .ltp.toFixed(2);
    }
  };


   
  return (
    <OpenOrderContext.Provider
      value={{ openOrders, setOpenOrderCount, addOpenOrder, cancleOrder }}
    >
      {props.children}
    </OpenOrderContext.Provider>
  );
}

export default OpenOrder;
