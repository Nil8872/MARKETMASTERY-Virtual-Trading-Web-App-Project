import React from "react";
import "./position.css";
import positionData from './positionData';
import dayHistoryData from './DayHistoryData'

function PositionSidebar() {
  return (
    <div>
      <div className="positionSidebar" style={{ color: "white" }}>
        <div className="positionBox">
          <div className="openOrder">
            <span>
              Position<span>(5)</span>
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
              {positionData.map((order) => {
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
