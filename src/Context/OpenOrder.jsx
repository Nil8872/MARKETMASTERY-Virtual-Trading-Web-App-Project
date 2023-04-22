import React, { useState, useEffect } from "react";
import OpenOrderContext from "./OpenOrderContext";
const baseUrl = "http://localhost:5000"

function OpenOrder(props) {
  const token = localStorage.getItem("token");
  const [openOrders, setOpenOrders] = useState([]);
  const [openOrderCount, setOpenOrderCount] = useState(0);

  useEffect(() => {
    if (!token) {
    } else {
      getOpenOrders();
    }
  }, [openOrderCount]);

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

  return (
    <OpenOrderContext.Provider
      value={{ openOrders, setOpenOrderCount, addOpenOrder }}
    >
      {props.children}
    </OpenOrderContext.Provider>
  );
}

export default OpenOrder;
