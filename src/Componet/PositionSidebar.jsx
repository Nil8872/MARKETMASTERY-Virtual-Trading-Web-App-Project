import React, { useContext, useState } from "react";
import "../Styles/position.css";
import positionData from "../services/positionData";
import dayHistoryData from "../services/DayHistoryData";
import { ToastContainer, toast } from 'react-toastify';
import Button from "@mui/material/Button";

import ShareContext from "../Context/ShareContext"; 
import UserContext from "../Context/UserContex";

import DayHistoryContext from "../Context/DayHistoryContext";

const toastyStyle = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
  draggable: true,
}

function PositionSidebar() {
  const { shares, setShareCount, deleteShare } = useContext(ShareContext); 
  const [checked, setChecked] = useState([]);
  const {setUserCount} = useContext(UserContext);
  const {addShareInHistory, dayHistory, clearDayHistory, setHistoryCount}= useContext(DayHistoryContext)

  console.log(dayHistory);
  const handleChecked = (id) => {
    let present = false;
    checked.forEach((element) => {
      if (element === id) {
        present = true;
      }
    });
    console.log(present);
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

   
let newArray = checked; 
let l = newArray.length
  const handleExit = async()=>{ 

    for(let i =0;i<l; i++){
      const shareVar = shares; 
      let id = newArray[0];  
      const {price, qty, action, sharename, intraInvest, limitMarket} =  shareVar.filter((share)=>{return share._id === id})[0]
     
      await addShareInHistory({price, qty, action, sharename, intraInvest, limitMarket});
      await deleteShare(id,price, qty, action);  
      toast.error(`${sharename} X ${qty} is ${action} Successfully at price: ${price}`,toastyStyle)
      newArray.shift(); 
      setChecked(newArray);
      setShareCount((c) => c + 1); 
      setHistoryCount(c=>c+1);
      setUserCount((c)=>c+1);  
      
    }
  }


  const handleClear = ()=>{
    clearDayHistory();
    toast.success("Day History is Clear Successfully",toastyStyle)
    setHistoryCount(c=>c+1);
  }

  return (
    <div>
      <div className="positionSidebar" style={{ color: "white" }}>
        <div className="positionBox">
          <div className="openOrder">
            <span>
              Position<span>({shares.length})</span>
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
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Qty.</th>
                  <th>Avg.</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Chg.</th>
                </tr>
              </thead>
              <tfoot>
                <tr>
                  <td></td>
                  <td>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleExit}
                    >
                      Exit ({checked.length})
                    </Button>
                  </td>
                  <td></td>
                  <td>Total</td>
                  <td>20L</td>
                </tr>
              </tfoot>
              <tbody>
                {shares.map((share) => {
                  return (
                    <>
                      <tr key={share.price}>
                        <td>
                          <input
                            style={{ cursor: "pointer" }}
                            type="checkbox"
                            checked={share.checked}
                            onChange={() => handleChecked(share._id)}
                          />
                        </td>
                        <td>{share.sharename}</td>
                        <td>{share.action}</td>
                        <td>{share.qty}</td>
                        <td>{share.price}</td>
                        <td>{share.ltp}</td>
                        <td>{share.pAndL}</td>
                        <td>{share.change}</td>

                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="openOrder">
            <span>
              Day's History<span>({dayHistory.length})</span>
            </span>
          </div>
          <div className="row">
            <table>
            <tfoot>
                <tr>
                  <td>
                    <Button
                      variant="contained"
                      size="small"
                      color="error"
                      onClick={handleClear}
                      >
                      Clear ({dayHistory.length})
                    </Button>
                  </td>
                      <td>Clear</td>
                  <td>History</td>
                  <td> </td>
                  <td> </td>
                </tr>
              </tfoot>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Type</th>
                  <th>Qty.</th>
                  <th>Avg.</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Chg.</th>
                </tr>
              </thead>
              <tbody>
                {/* {dayHistoryData.map((order) => { */}
                {dayHistory.map((order) => {
                  return (
                    <>
                      <tr>
                        <td>{order.sharename}</td>
                        <td>{order.action}</td>
                        <td>{order.qty}</td>
                        <td>{order.price}</td>
                        <td>{order.action}</td>
                        <td>{order.intraInvest}</td>
                        <td>{order.limitMarket}</td>
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
  );
  <ToastContainer/>
}

export default PositionSidebar;
