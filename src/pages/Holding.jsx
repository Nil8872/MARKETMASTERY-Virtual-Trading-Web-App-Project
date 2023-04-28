import React, { useContext } from "react";
import WatchList from "../Componet/WatchList";
import { Navigate } from "react-router-dom";
import "../Styles/HoldingPage.css"; 
import ShareContext from "../Context/ShareContext";
import RealTimeDataContext from "../Context/RealTimeDataContext";

function Holding() {
  const { shares } = useContext(ShareContext); 
  const {sharePrices} = useContext(RealTimeDataContext);
  const token = localStorage.getItem("token");


  
  const getShareLTP = (sharename)=>{ 
    if((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0]){
      return (((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0].ltp).toFixed(2))
    }
  }

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
              <div className="row">
                <table>
                  <thead>
                    <tr>
                      <th>Insturment</th>
                      <th>Qty</th>
                      <th>Avg. cost</th>
                      <th>LTP.</th>
                      <th>Cur. val</th>
                      <th>P&L</th>
                      <th>Net chg.</th>
                      <th>Day chg.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shares.map((order) => {
                      return (
                        <>
                          <tr>
                            <td>{order.sharename}</td>
                            <td>{order.qty}</td>
                            <td>{(order.price).toFixed(2)}</td>
                            <td>{getShareLTP(order.sharename)}</td>
                            <td>{(order.qty * (getShareLTP(order.sharename))).toFixed(2)}</td>
                            <td>{ (order.qty * (getShareLTP(order.sharename) - order.price)).toFixed(2)}</td>
                            <td>{(getShareLTP(order.sharename) - order.price).toFixed(2)}</td>
                            <td>{(getShareLTP(order.sharename) - order.price).toFixed(2)}</td>
                            {/* <td>{order.status}</td> */}
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
 
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Holding;
