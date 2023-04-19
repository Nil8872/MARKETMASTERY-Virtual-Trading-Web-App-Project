import React, { useContext, useState } from "react";
import "../Styles/position.css";
import positionData from "../services/positionData";
import dayHistoryData from "../services/DayHistoryData";

import Button from "@mui/material/Button";

import ShareContext from "../Context/ShareContext";

function PositionSidebar() {
  const { shares, setCount, deleteShare } = useContext(ShareContext);
  const [checked, setChecked] = useState([]);

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
      console.log("Else part run because first time");
      const newChecked = [...checked, id];
      setChecked(newChecked);
    }
  };

let newArray = checked; 
let l = newArray.length
  const handleExit = ()=>{ 

    for(let i =0;i<l; i++){
      let id = newArray[0];
      deleteShare(id);
      newArray.shift(); 
      setChecked(newArray);
      setCount((c) => c + 1);   
      
    }
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
              Day's History<span>(10)</span>
            </span>
          </div>
          <div className="row">
            <table>
              <thead>
                <tr>
                  <th>Instrument</th>
                  <th>Qty.</th>
                  <th>Avg.</th>
                  <th>LTP</th>
                  <th>P&L</th>
                  <th>Chg.</th>
                </tr>
              </thead>
              <tbody>
                {dayHistoryData.map((order) => {
                  return (
                    <>
                      <tr>
                        <td>{order.shareName}</td>
                        <td>{order.qty}</td>
                        <td>{order.avgPrice}</td>
                        <td>{order.ltp}</td>
                        <td>{order.pAndL}</td>
                        <td>{order.change}</td>
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
}

export default PositionSidebar;
