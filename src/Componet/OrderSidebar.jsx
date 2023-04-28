import React, { useContext, useState } from "react";
import "../Styles/order.css"; 
import OrederExecuteContext from "../Context/OrederExecuteContext";
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";
import OpenOrderContext from "../Context/OpenOrderContext";  
import RealTimeDataContext from "../Context/RealTimeDataContext";

const toastyStyle = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
  draggable: true,
}

function OrderSidebar() {
  const {sharePrices} = useContext(RealTimeDataContext);
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState([]);
  const { exeOrders, clearAllOrder,setExeOrderCount } = useContext(OrederExecuteContext);
  const {openOrders, cancleOrder, setOpenOrderCount} = useContext(OpenOrderContext)

  const getShareLTP = (sharename)=>{ 
    if((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0]){
      return (((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0].ltp).toFixed(2))
    }
  }

  const handleClearOrder = ()=>{
    clearAllOrder();
    setExeOrderCount();
    toast.success("Executed Oredered History Cleared!",toastyStyle )
  }

  let newArray = checked;
  let l = newArray.length;

  const handleCancle = async()=>{

    for (let i = 0; i < l; i++) { 
      let id = newArray[0];

      await cancleOrder(id);
      toast.success("Order Cancle Successfully!", toastyStyle);

      newArray.shift();
      setChecked(newArray);
      setOpenOrderCount(c=>c+1);
      setCount(c=>c+1);
    }
  }

  const handleChecked = (id) => {
    let present = false;
    checked.forEach((element) => {
      if (element === id) {
        present = true;
      }
    }); 
    if (present) {
      const newChecked = checked.filter((item) => {
        return item !== id;
      });

      setChecked(newChecked);
    } else {
      const newChecked = [...checked, id];
      setChecked(newChecked);
    }
  };

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
              <th>
                    {" "}
                    <input style={{ cursor: "pointer" }} type="checkbox" />
                  </th>
                <th>Time</th>
                <th>Type</th>
                <th>Instrument</th>
                <th>Qty.</th>
                <th>LTP</th>
                <th>Price</th>
                <th>Status</th>
              </tr>
            </thead>
            <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleCancle}
                    >
                      Cancle ({checked.length})
                    </Button>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td id="total"></td>
                  <td></td>
                </tr>
                </tfoot>
            <tbody>
              {openOrders.map((order) => {
                return (
                  <>
                    <tr>
                    <td>
                          <input
                            style={{ cursor: "pointer" }}
                            type="checkbox"
                            checked={order.checked}
                            onChange={() => handleChecked(order._id)}
                          />
                        </td>
                      <td>{order.time}</td>
                      <td>{order.action}</td>
                      <td>{order.sharename}</td>
                      <td>{order.qty}</td>
                      <td>{(getShareLTP(order.sharename))}</td>
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
