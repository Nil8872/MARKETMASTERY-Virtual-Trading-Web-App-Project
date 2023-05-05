import React, { useContext, useState } from "react";
import "../Styles/position.css"; 
import { ToastContainer, toast } from "react-toastify";
import Button from "@mui/material/Button";

import ShareContext from "../Context/ShareContext";
import UserContext from "../Context/UserContex";
import RealTimeDataContext from "../Context/RealTimeDataContext";
import DayHistoryContext from "../Context/DayHistoryContext";
const baseUrl = "http://localhost:5000";

const toastyStyle = {
  position: "top-right",
  autoClose: 3000,
  theme: "colored",
  draggable: true,
};

function PositionSidebar() {
  const { shares, setShareCount, deleteShare } = useContext(ShareContext);
  const [checked, setChecked] = useState([]);
  const [count, setCount] = useState(0);
  const {updateUser,  setUserCount } = useContext(UserContext);
  const { addShareInHistory, dayHistory, clearDayHistory, setHistoryCount } =
    useContext(DayHistoryContext);  

  const {sharePrices} = useContext(RealTimeDataContext); 


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

  const updateUserWithData = async(price, qty, sharePandL)=>{ 

    const token = localStorage.getItem('token');
    const option = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token,
      },
    };

    const response = await fetch(`${baseUrl}/api/auth/getUser`, option);
    const user = await response.json();



    let prevused =  await user.usedMargin
    let avail;
    const used = price * qty;
    let pAndL = user.pAndL;
    pAndL += parseFloat(sharePandL);

    prevused = prevused - used;
    avail = (await user.availMargin) + used + parseFloat(sharePandL);
     

    const updatedData = {
      ...user,
      usedMargin: prevused.toFixed(2),
      availMargin: avail.toFixed(2), 
      pAndL,
    };
 
       
 
    await updateUser(user._id, updatedData);  
    setUserCount(e => e + 1);
     
  }

  let newArray = checked; 
  const handleExit = async () => {
    // for (let i = 0; i < l; i++) {
       while(newArray.length !==0){
      const shareVar = shares;
      console.log(newArray)
      let id = newArray[0];
      console.log('Id is :'+ id);
      const { price, qty, action, sharename, intraInvest, limitMarket } =
        shareVar.filter((share) => {
          return share._id === id;
        })[0];

        const sharePandL =   (qty * (getShareLTP(sharename) - price)).toFixed(2);
      await addShareInHistory({
        price :(getShareLTP(sharename)),
        qty,
        action,
        sharename,
        intraInvest,
        limitMarket,
        sharePandL,
      });
    


      await deleteShare(id, price, qty, action);
      await updateUserWithData(price,qty,sharePandL); 

      toast.success(
        `${sharename} X ${qty} is ${action} Successfully at price: ${price}`,
        toastyStyle
      );
      newArray.shift();
      setChecked(newArray);
      setShareCount((c) => c + 1);
      setHistoryCount((c) => c + 1);
      setUserCount((c) => c + 1);
      setCount(c=>c+1);
    }
  };

  const handleClear = () => {
    clearDayHistory();
    toast.success("Day History is Clear Successfully", toastyStyle);
    setHistoryCount((c) => c + 1);
  };
 

  const getShareLTP = (sharename)=>{ 
    if((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0]){
      return (((sharePrices.filter((dataShare)=>{return dataShare.sharename === sharename }))[0].ltp).toFixed(2))
    }
  }

const getTotalProfit = ()=>{
  let profit = 0; 
  shares.map((share)=>{   
    if(share.action === "Buy"){
      profit += parseFloat(
        (share.qty * (getShareLTP(share.sharename) - share.price))
        
        ) 
      }
      else{
        profit += parseFloat(
          ( -1* (share.qty * (getShareLTP(share.sharename) - share.price)))
          
          ) 
      }

    
  })
  return (profit.toFixed(2))

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
              {/* <tfoot>
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
                  <td></td>
                  <td></td>
                  <td>Total</td>
                  <td id="total">{getTotalProfit()}</td>
                  <td></td>
                </tr>
              </tfoot> */}
              {/* <div className="empty" style={{height:"150px", width:'100%'}}>
                  {
                    (shares.length == 0) ? <> <p>You haven't placed any orders today</p></>:'' 
                  }
              </div> */}
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
                        <td>{(share.price).toFixed(2)}</td>
                        <td>{getShareLTP(share.sharename)}</td>
                        <td>{ share.action==="Buy"? <>{(share.qty * (getShareLTP(share.sharename) - share.price)).toFixed(2)}</>
                        :<>{ -1 *((share.qty * (getShareLTP(share.sharename) - share.price)).toFixed(2))} </> }</td>
                        <td>{((getShareLTP(share.sharename) - share.price).toFixed(2))}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
            { (shares.length === 0)? (
            <div className="boxForEmpty" style={{
              // border: '2px solid white', 
              height:"200px" ,display:"flex", alignItems:'center', justifyContent:'center'}}>
                  <div className="text">
                  <h3 style={{color:'#3f7b3f', textAlign:'center', padding:"100px"}}>
                  You don't have any positions yet
                    </h3> 
                  </div>  
            </div>
          ):( 
            <>
             <div className="cancleButton row" style={{marginBottom:"20px" }}>

            <div style={{width:'50%'}}> 
             <Button
                      variant="contained"
                      // size="small"
                      onClick={handleExit}
                      style={{width:"100px"}}
                      >
                      Exit ({checked.length})
              </Button>
                      </div>

              <div style={{width:'50%'}}> 
                <h3 style={{color:'rgba(255,255,255,0.8)'}}>Total P&L : <span>{getTotalProfit()}</span></h3>
              </div>
            </div>
            </>
          )
        }
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
                {dayHistory.map((order) => {
                  return (
                    <>
                      <tr>
                        <td>{order.sharename}</td>
                        <td>{order.action}</td>
                        <td>{order.qty}</td>
                        <td>{(order.price).toFixed(2)}</td>
                        <td>{getShareLTP(order.sharename)}</td>
                        <td>{order.sharePandL}</td>
                        <td>{(getShareLTP(order.sharename) - order.price).toFixed(2)}</td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />;
    </div>
  );
}

export default PositionSidebar;
