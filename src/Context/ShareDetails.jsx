import React, { useEffect, useState } from "react";
import ShareContext from "./ShareContext"; 

const baseUrl = "http://localhost:5000";

function ShareDetails(props) {
  const [shares, setShares] = useState([]);
  const [watchListShares, setWatchListSahres] = useState([]);
  const [shareCount, setShareCount] = useState(0); 
  const [watchListCount, setWatchListCount] = useState(0);
  const token = localStorage.getItem("token");

 
  useEffect(()=>{
    if(!token){ 
    }
    else{

      getShare(); 
      // getWatchShare();
    }
  },[shareCount])
  useEffect(()=>{
    if(!token){ 
    }
    else{

      // getShare(); 
      getWatchShare();
    }
  },[watchListCount])
  

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

  const getWatchShare = async () => {
    const watchShares = await fetch(`${baseUrl}/api/watchList/get`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    });

    const result = await watchShares.json(); 
      setWatchListSahres(result);
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


  const addtoWatchList = async (share) => {
    console.log(share)
    try {
      const option = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        },
        body: JSON.stringify(share),
      };
      try {
        const response = await fetch(`${baseUrl}/api/watchList/add`, option);
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
    } catch (error) {
      console.log(error);
    }
  };
 

  const deleteWatchList = async (sharename) => {
    const option = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify({sharename}),
    };
    try {
      const result = await fetch(
        `${baseUrl}/api/watchList/deleteShare`,
        option
      ); 
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ShareContext.Provider
      value={{ shares, addShare, setShareCount, updateShare, deleteShare, watchListShares,addtoWatchList,deleteWatchList,setWatchListCount }}
    >
      {props.children}
    </ShareContext.Provider>
  );
}

export default ShareDetails;
