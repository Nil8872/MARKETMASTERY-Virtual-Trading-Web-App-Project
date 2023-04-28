import React, { useContext, useEffect, useState } from "react";
import UserContext from "./UserContex";  
import DayHistoryContext from "./DayHistoryContext"; 
import OrederExecuteContext from "./OrederExecuteContext";
import OpenOrderContext from "./OpenOrderContext";
import ShareContext from "./ShareContext";
const baseUrl = "http://localhost:5000";

function UserDetail(props) { 
  const [user, setUser] = useState({});
  const [count, setUserCount] = useState(0);
  const token =  localStorage.getItem("token");
  const {setHistoryCount} = useContext(DayHistoryContext) ; 
  const {setExeOrderCount} = useContext(OrederExecuteContext);
  const {setOpenOrderCount} = useContext(OpenOrderContext);
  const {setShareCount} = useContext(ShareContext);
  

  const fetchUserDetail = async () => { 

    // using API End Point and store data in backend
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const response = await fetch(`${baseUrl}/api/auth/getUser`, option);
    const result = await response.json();
    // console.log(result);
    setUser(result);
  };
  useEffect(() => {
    // console.log("UseEffect called");
    if (!token) {
    } else {
      fetchUserDetail(); 
      setHistoryCount(C=>C+1) 
      setExeOrderCount(c=>c+1);
      setOpenOrderCount(c=>c+1);
      setShareCount(c=>c+1);
    

      // console.log("function Call fetchUserDetail")
    }
  }, [count]);

  const updateUser =async (userId, updatedData)=>{
    

    try {
      const option = {
        method : "PUT",
        headers : {
          "Content-type" : "application/json",
          "auth-token" : token,
        },
        body: JSON.stringify(updatedData)

      }
    
      const data = await fetch(`${baseUrl}/api/auth/updateUser/${userId}`, option);
    //  console.log(await data.json());

    } catch (error) {
      console.log(error);
    }
  }


 
  return (
    <UserContext.Provider value={{ user,setUserCount, updateUser,fetchUserDetail }}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserDetail;
