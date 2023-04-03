import React, { useContext } from "react";
import UserContext from "../Context/UserContex";
import { FcCurrencyExchange } from "react-icons/fc";
import { BsFillBriefcaseFill } from "react-icons/bs";


function Sidebar() {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="userNameD">
        <h1 style={{ color: "rgba(255,255,255,0.8)" }}>Hii, {user.name}</h1>
      </div>
      <div className="margin-box" style={{ color: "white" }}>
        <div className="first-box">
          <div className="exchangeName">
            <span className="icon" style={{ margin: "20px" }}>
              <FcCurrencyExchange fontSize={33} />
            </span>
            <span style={{ fontSize: "1.3rem" }}>Equity</span>
          </div>
          <div className="avail-margin">
            <div className="main-margin">
              <span>10,00,000</span>
              <div className="margin" style={{ paddingLeft: "26px" }}>
                <p style={{ fontSize: "14px" }}>Margin available</p>
              </div>
            </div>
            <div className="used-margin">
              <div className="useMargin">
                <p>
                  Margin used: <span> 2000</span>
                </p>
              </div>
              <div className="openingBalance">
                <p>
                  Opening Balance: <span> 5000</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="second-box"></div>
      </div>


      <div className="margin-box" style={{ color: "white" }}>
        <div className="first-box">
          <div className="exchangeName">
            <span className="icon" style={{ margin: "20px" }}>
              < BsFillBriefcaseFill />
            </span>
            <span style={{ fontSize: "1.3rem" }}>Portfolio <span className="count"> (32)</span></span>
          </div>
          <div className="avail-margin">
            <div className="main-margin">
              <span>5,00,00</span> 
              <div className="margin" style={{ paddingLeft: "26px" }}>
                <p style={{ fontSize: "14px" }}>P&L</p>
              </div>
            </div>
            <div className="used-margin">
              <div className="useMargin">
                <p>
                  Current value: <span> 3L</span>
                </p>
              </div>
              <div className="openingBalance">
                <p>
                  Investment: <span> 1.35L</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="second-box"></div>
      </div>
    </>
  );
}

export default Sidebar;
