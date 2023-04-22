import React, { useContext } from "react";
import "../Styles/order.css";
import openOrderData from "../services/OrederOpenData";
import OrederExecuteContext from "../Context/OrederExecuteContext";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import OpenOrderContext from "../Context/OpenOrderContext";

const toastyStyle = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
  draggable: true,
}

function OrderSidebar() {
  const { exeOrders, clearAllOrder,setExeOrderCount } = useContext(OrederExecuteContext);
  const {openOrders} = useContext(OpenOrderContext)

  const handleClearOrder = ()=>{
    clearAllOrder();
    setExeOrderCount();
    toast.success("Executed Oredered History Cleared!",toastyStyle )
  }
  return (
    <>
    <ToastContainer/>
      <div className="orderSidebar" style={{ color: "white" }}>
        <div className="openOrder">
          <span>
            Open orders<span>({openOrders.length})</span>
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
              {openOrders.map((order) => {
                return (
                  <>
                    <tr>
                      <td>{order.time}</td>
                      <td>{order.action}</td>
                      <td>{order.sharename}</td>
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
        <div
          className="openOrder"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            Executed orders<span> ({exeOrders.length})</span>
          </div>
          <div className="clear">
            <Button
              color="error"
              size="small"
              variant="contained"
              style={{ marginRight: "9px" }}
              onClick={handleClearOrder}
            >
              Clear ({exeOrders.length})
            </Button>
          </div>
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
                      {order.status === "Completed" ? (
                        <td style={{ color: "green", fontWeight: "700" }}>
                          {order.status}
                        </td>
                      ) : (
                        <td style={{ color: "red", fontWeight: "700" }}>
                          {order.status}
                        </td>
                      )}
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
