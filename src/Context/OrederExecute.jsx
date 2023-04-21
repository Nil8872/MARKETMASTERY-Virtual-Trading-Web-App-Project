import React, { useState, useEffect } from "react";
import OrederExecuteContext from "./OrederExecuteContext";

const baseUrl = "http://localhost:5000";

function OrederExecute(props) {
  const token = localStorage.getItem("token");
  const [exeOrders, setExeOrder] = useState([]);
  const [exeOrderCount, setExeOrderCount] = useState(0);

  useEffect(() => {
    if (!token) {
    } else {
      getExeOrders();
    }
  }, [exeOrderCount]);

  const getExeOrders = async () => {
    const option = {
      method: "GET",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
    };

    try {
      const data = await fetch(`${baseUrl}/api/exeOrders/getOrders`, option);
      const executeOrderData = await data.json();
      setExeOrder(executeOrderData);
    } catch (error) {
      console.log(error);
    }
  };

  //   function for add Executed order  in dataBase
  const addExeOreder = async (orderData) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(orderData),
    };

    try {
      const result = await fetch(`${baseUrl}/api/exeOrders/add`, option);
      console.log(await result.json());
    } catch (error) {
      console.log(error);
    }
  };

  // this function clear all order history from dataBase4

  const clearAllOrder = async () => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    try {
      const result = await fetch(
        `${baseUrl}/api/exeOrders/clearOreders`,
        option
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <OrederExecuteContext.Provider
      value={{ exeOrders, setExeOrderCount, addExeOreder, clearAllOrder }}
    >
      {props.children}
    </OrederExecuteContext.Provider>
  );
}

export default OrederExecute;
