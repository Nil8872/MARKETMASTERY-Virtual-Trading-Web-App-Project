import React,{useContext} from "react";
import "../Styles/position.css";
import positionData from '../services/positionData';
import dayHistoryData from '../services/DayHistoryData'

import ShareContext from "../Context/ShareContext";

function PositionSidebar() {
  const {shares} = useContext(ShareContext); 
  console.log(shares);
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
                <td></td>
                <td></td>
                <td>Total</td>
                <td>20L</td>

              </tr>
            </tfoot>
            <tbody>
              {shares.map((share) => {
                return (
                  < >
                    <tr key={share.price}>
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
