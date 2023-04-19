import React, { useContext, useEffect, useState } from "react";
import ShareContext from "./ShareContext";
import UserContext from "./UserContex";

const baseUrl = "http://localhost:5000";
const token = localStorage.getItem("token");

function ShareDetails(props) {
  const [shares, setShares] = useState([]);

  const [count, setCount] = useState(0);
  useEffect(() => {
    getShare();
  }, [count]);

  const { user, updateUser, setUserCount } = useContext(UserContext);
  const id = user._id;

  // fuction for get Share detail from database
  const getShare = async () => {
    const share = await fetch(`${baseUrl}/api/share/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const result = await share.json();
    setShares(result);
  };

  // fuction for addShare in DataBase
  const addShare = async (price, qty, action, buySellShare) => {
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(buySellShare),
      };
      try {
        const response = await fetch(`${baseUrl}/api/share/add`, option);
        const result = await response.json();

        let prevused = parseInt(user.usedMargin);
        let avail;
        const used = price * qty;

        if (action === "Buy") {
          prevused = prevused + used;
          avail = user.availMargin - used;
        }
        if (action === "Sell") {
          prevused = prevused - used;
          avail = user.availMargin + used;
        }
        const updatedData = {
          ...user,
          usedMargin: prevused.toFixed(2),
          availMargin: avail.toFixed(2),
        };

        updateUser(id, updatedData);
        setUserCount((e) => e + 1);
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // fuction for updateShare in DataBase
  const updateShare = async (shareId, price, qty, action, updatedData) => {
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(updatedData),
    };

    try {
      const result = await fetch(
        `${baseUrl}/api/share/updateShare/${shareId}`,
        option
      );

      let prevused = parseInt(user.usedMargin);
      let avail;
      const used = price * qty;

      if (action === "Buy") {
        prevused = prevused + used;
        avail = user.availMargin - used;
      }
      if (action === "Sell") {
        prevused = prevused - used;
        avail = user.availMargin + used;
      }
      const updatedData = {
        ...user,
        usedMargin: prevused.toFixed(2),
        availMargin: avail.toFixed(2),
      };

      updateUser(id, updatedData);
      setUserCount((e) => e + 1);
    } catch (error) {
      console.log(error);
    }
  };

  // fuction for delete Share from DataBase

  const deleteShare = async(shareId) => { 
    const option = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": token
      },
    };
    try {
      
      const result = await fetch(
        `${baseUrl}/api/share/deleteShare/${shareId}`,
        option
      );
    
    console.log( await result.json());
  } catch (error) {
      console.log(error);
  }
  };
  return (
    <ShareContext.Provider value={{ shares, addShare, setCount, updateShare, deleteShare }}>
      {props.children}
    </ShareContext.Provider>
  );
}

export default ShareDetails;
