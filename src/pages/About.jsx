import React, { useEffect, useState } from "react";
import moment from "moment";
import prices from "../services/RealTimeData"


function About() {
  const [time, setTime] = useState();
  const [count, setCount] = useState(prices);

  setInterval(() => {
    setTime(moment().format("LTS"));
  }, 1000);

  const randomPriceGenerator = (prices) => {
    prices.map((share) => {
      setInterval(() => {
        let randomprice = Math.random() - 0.5;
        share.ltp = share.ltp + randomprice;
        share.absoluteprice = share.lastprice - share.ltp;
        share.percentegeprice = ((share.absoluteprice)*100)/ (share.lastprice);
      }, [1000]);
    });
  };

  randomPriceGenerator(prices);

  console.log(time);

  useEffect(() => {
    setCount(prices);
  }, [prices]);
  console.log(count);

  // console.log(time)

  return (
    <div style={{ height: "92.5vh" }}>
      <h1>This is About</h1>

      <h1>
        Time is Right Now : <span style={{ color: "white" }}>{time}</span>{" "}
      </h1>

   

            <table>
              <thead>
                <tr>
                  <th>Sharename</th>
                  <th>LTP</th>
                  <th>change</th>
                  <th>percentege</th>
                </tr>
              </thead>

              <tbody>
                {
                  count.map((share) =>{
                    return (
                      <tr style={{color: 'white'}}>
                        <td>{(share.sharename)}</td>
                        <td>{(share.ltp).toFixed(2)}</td>
                        <td>{(share.absoluteprice).toFixed(2)}</td>
                        <td>{(share.percentegeprice).toFixed(2)}</td>
                      </tr> 
                    )
                  })
                }
              </tbody>
            </table> 
    </div>
  );
}

export default About;
