import React from "react";

function OneShare(props) {
  const { shareName, absolutePrice, percentegePrice, lastPrice } = props;
  return (
    <>
      <div className="share-list" style={{fontSize: '14px'}}>
        <div className="share">
          <div className="symbol-wrapper">
            <div
              style={{ color: "rgba(255,255,255, 0.7)" }}
              className="shareName"
            >
              {shareName}
            </div>
            <div className="buySell"></div>
          </div>
          <div className="price-wrapper">
            <div className="price-change">
              <div className="dim">
                <span style={{ color: "green" }} className="price-absolute">
                  {absolutePrice}
                </span>
                <span
                  className="price-percentage"
                  style={{ color: "rgba(255,255,255, 0.7)" }}
                >
                  {percentegePrice}
                  <span className="text-xxsmall">%</span>
                </span>
              </div>
            </div>
            <div className="price">
              <span style={{ color: "green" }} className="last-price">
                {lastPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneShare;
