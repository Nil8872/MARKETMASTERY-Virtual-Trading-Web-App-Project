import React, { useEffect, useState } from "react";
import ShareContext from "./ShareContext"; 

const baseUrl = "http://localhost:5000";

function ShareDetails(props) {
  const [shares, setShares] = useState([]);
  const [shareCount, setShareCount] = useState(0); 
  const token = localStorage.getItem("token");

 
  useEffect(()=>{
    if(!token){

      console.log("Not token")
    }
    else{

      getShare();
      console.log("Get Share Fuction Called")
    }
  },[shareCount])
  

  // fuction for get Share detail from database

  const getShare = async () => {
    const shares = await fetch(`${baseUrl}/api/share/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const result = await shares.json();
    console.log(result)
      setShares(result);
  };

  
  // fuction for addShare in DataBase
  
  const addShare = async (buySellShare) => {
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

      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      console.log(error);
    }
  };


  // fuction for updateShare in DataBase
  
  const updateShare = async (shareId, updatedData) => {
    const option = {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(updatedData),
    };

    try {
     await fetch(
        `${baseUrl}/api/share/updateShare/${shareId}`,
        option

      );

      
    } catch (error) {
      console.log(error);
    }
  };

  
  // fuction for delete Share from DataBase
 
  const deleteShare = async (shareId) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
    };
    try {
      const result = await fetch(
        `${baseUrl}/api/share/deleteShare/${shareId}`,
        option
      );
      // console.log(result); 
      // console.log("Share Deteted");
      // console.log(`Price is :${price} Qty is : ${qty} and Action is : ${action}`);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ShareContext.Provider
      value={{ shares, addShare, setShareCount, updateShare, deleteShare }}
    >
      {props.children}
    </ShareContext.Provider>
  );
}

export default ShareDetails;
