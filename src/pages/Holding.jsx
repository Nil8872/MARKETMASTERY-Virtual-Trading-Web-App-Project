import React from "react";
import WatchList from "../Componet/WatchList";
import { Navigate } from "react-router-dom";
import "../Styles/HoldingPage.css";
import HoldingStocks from "../Componet/HoldingStocks";
import hodingStockData from '../services/HoldingStock';


function Holding() {
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
            <div
              className="sidebarContainer"
              style={{ color: "white", fontSize: "16px" }}
            >
              <div className="holdingBox">
                <div className="holdingBar">
                  <div className="instrument">
                    <div className="bar-item">
                      <span>Instrument</span>
                    </div>
                  </div>

                  <div className="avgQty">
                    <div className="bar-item qty">Qty</div>
                    <div className="bar-item avgCost">Avg. cost</div>
                  <div className="bar-item ltp">LTP</div>
                  </div>
                  <div className="twoPartition">
                  <div className="bar-item partition">Cur. val</div>
                  <div className="bar-item partition">P&L</div>
                  </div>

                  <div className="twoPartition">
                  <div className="bar-item partition">Net chg.</div>
                  <div className="bar-item partition">Day chg.</div>
                  </div>
                </div>
              </div>
              <div className="holdingStockList">
            {
              hodingStockData.map((stockData)=>{
               return (<HoldingStocks 
                stockName={stockData.stockName}
                qty={stockData.qty}
                avgCost={stockData.avgCost}
                curValue={stockData.curValue}
                ltp={stockData.ltp}
                pAndL={stockData.pAndL}
                netChg={stockData.netChg}
                dayChg={stockData.dayChg}
                />
               )
              })
            }
            </div>
              
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Holding;
