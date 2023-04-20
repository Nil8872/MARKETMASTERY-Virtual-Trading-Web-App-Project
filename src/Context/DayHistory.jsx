import React, { useState, useEffect } from "react";
import DayHistoryContext from "./DayHistoryContext";
const baseUrl = "http://localhost:5000";

function DayHistory(props) {
    const [dayHistory, setDayHistory] = useState([]);
    const [historyCount, setHistoryCount] = useState(0);
  const token = localStorage.getItem("token");

  // using API End Point and store data in backend of When share is sell then that apper in Day History...

  useEffect(()=>{
    if(!token){

    }
    else{

      getDayHistory();
    }
  },[historyCount])

  const getDayHistory = async () =>{

    const option = {
        method : "GET",
        headers : {
            "Content-type" : "application/json",
            'auth-token': token,
        }
    }

    try {
        
       const data =  await fetch(`${baseUrl}/api/dayHistory/getHistory`, option);
        const dayHistoryData = await data.json(); 
       setDayHistory(dayHistoryData);

    } catch (error) {
        
    }
  }
  

//   function for add share in DayHistory with dataBase also 
  const addShareInHistory = async (shareData) => {
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
      body: JSON.stringify(shareData),
    };

    try {

        await fetch(`${baseUrl}/api/dayHistory/add`, option); 
        
    } catch (error) {
        console.log(error);
    }
  };

// function for clear day History 

const clearDayHistory = async()=> {
    const option = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        } 
      };
  

    try {
         const result  = await fetch(`${baseUrl}/api/dayHistory/clearHistory`, option)
         console.log(await result.json());
    } catch (error) {
        
    }
}


  return (
    <DayHistoryContext.Provider value={{ addShareInHistory,dayHistory, setHistoryCount, clearDayHistory }}>
      {props.children}
    </DayHistoryContext.Provider>
  );
}

export default DayHistory;
