import React from "react";

function HoldingStocks(props) {
  const { stockName, qty, avgCost, curValue, pAndL, netChg, dayChg, ltp } =
    props;
  return (
    <>
      <div className="holdingBox" style={{fontSize:'12px'}}>
        <div className="stockHoldingList" style={{borderBottom:"1px solid rgba(255,255,255,0.1)"}}>
          <div className="instrument">
            <div className="bar-item ">
              <span>{stockName}</span>
            </div>
          </div>

          <div className="avgQty">
            <div className="bar-item qty">{qty}</div>
            <div className="bar-item avgCost">{avgCost}</div>
            <div className="bar-item ltp">{ltp}</div>
          </div>
          <div className="twoPartition">
            <div className="bar-item partition">{curValue}</div>
            <div className="bar-item partition">{pAndL}</div>
          </div>

          <div className="twoPartition">
            <div className="bar-item partition">{netChg}<span>%</span> </div>
            <div className="bar-item partition">{dayChg} <span>%</span> </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HoldingStocks;
