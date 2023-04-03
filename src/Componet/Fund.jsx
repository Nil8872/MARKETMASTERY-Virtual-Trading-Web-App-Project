import React from "react";
import WatchList from "./WatchList";
import { Navigate } from "react-router-dom";
import { FcCurrencyExchange } from "react-icons/fc";
import "./fund.css";

function Fund() {
  const token = localStorage.getItem("token");
  return (
    <>
      {token === null ? (
        <Navigate to="/login" replace={true} />
      ) : (
        <div
          style={{ height: "92.5vh", display: "flex" }}
          className="container"
        >
          <div className="main-Container">
            <div className="watchListContainer">
              <WatchList />
            </div>
            <div className="sidebarContainer" style={{ color: "white" }}>
              <div className="fundMainBox">
                <div className="fund">
                  <div className="exchangeName" style={{marginBottom:"20px"}}>
                    <span className="icon" style={{ margin: "20px" }}>
                      <FcCurrencyExchange fontSize={40} />
                    </span>
                    <span style={{ fontSize: "1.5rem" }}>Equity</span>
                  </div>
                  <div className="avalMargin">
                    <div><span className="marginitem">Available margin</span></div>
                    <div><span className="value">12000.00</span></div>
                  </div>  
                  <div className="avalMargin">
                    <div><span className="marginitem">Used margin</span></div>
                    <div><span className="value">4000.00</span></div>
                  </div>
                  <div className="avalMargin" style={{borderBottom:'1px solid rgba(255,255,255,0.1)'}}>
                    <div><span className="marginitem">Available cash</span></div>
                    <div><span className="value" >15000.00</span></div>
                  </div>
                  <div className="avalMargin"  >
                    <div><span className="marginitem">Opening balance</span></div>
                    <div><span className="value" >10000.00</span></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Fund;
