import React, { useContext } from "react";
import "../Styles/order.css";
import openOrderData from '../services/OrederOpenData'
import orderExecutedData from '../services/OrderExecutedData'
import OrederExecuteContext from "../Context/OrederExecuteContext";


function OrderSidebar() {
  const {exeOrders} = useContext(OrederExecuteContext);
  return (
    <>
      <div className="orderSidebar" style={{ color: "white" }}>
        <div className="openOrder">
          <span>
            Open orders<span>(23)</span>
          </span>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>LTP</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {openOrderData.map((order) => {
                return (
                  <>
                    <tr>
                      <td>{order.time}</td>
                      <td>{order.type}</td>
                      <td>{order.shareName}</td>
                      <td>{order.qty}</td>
                      <td>{order.ltp}</td>
                      <td>{order.price}</td>
                      <td>{order.status}</td>
                    </tr>
                  </>
                );
              })}

            </tbody>
          </table>
        </div>
        <div className="openOrder">
          <span>
            Executed orders<span>({exeOrders.length})</span>
          </span>
        </div>
        <div className="row">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Qty.</th> 
                <th>Avg. price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* {orderExecutedData.map((order) => { */}
              {exeOrders.map((order) => {
                return (
                  <>
                    <tr>
                      <td>{order.time}</td>
                      <td>{order.action}</td>
                      <td>{order.sharename}</td>
                      <td>{order.qty}</td> 
                      <td>{order.price}</td>
                      <td>{order.status}</td>
                    </tr>
                  </>
                );
              })}

            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default OrderSidebar;
