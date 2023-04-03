import React from "react";
import WatchList from "./WatchList";
import { Navigate } from "react-router-dom";
import OrderSidebar from "./OrderSidebar";


function Order() {
  const token = localStorage.getItem('token');
  return (
    <>

{(token === null) ? (
      <Navigate to="/login" replace={true}/>
    ) : (
      <div style={{ height: "92.5vh", display: "flex" }} className="container">
        <div className="main-Container">
          <div className="watchListContainer">
            <WatchList />
          </div>
          <div className="sidebarContainer">
            <OrderSidebar/>
          </div>
        </div>
      </div>
       )   }
    </>
  );
}

export default Order;
