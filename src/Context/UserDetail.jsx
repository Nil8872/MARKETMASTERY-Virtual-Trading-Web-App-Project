import React, { useEffect, useState } from "react";
import UserContext from "./UserContex"; 
const baseUrl = "http://localhost:5000";

function UserDetail(props) { 
  const [user, setUser] = useState({});
  const [count, setUserCount] = useState(0);
  const token =  localStorage.getItem("token");
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
    setUser(result);
  };
  useEffect(() => {
    console.log("UseEffect called");
    if (!token) {
    } else {
      fetchUserDetail();
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
     console.log(await data.json());

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
