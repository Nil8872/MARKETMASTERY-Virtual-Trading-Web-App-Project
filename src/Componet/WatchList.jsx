import React,{useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton"; 
import SearchIcon from "@mui/icons-material/Search";  
import Tooltip from "@mui/material/Tooltip";
import RealTimeDataContext from "../Context/RealTimeDataContext";
import ShareContext from "../Context/ShareContext";
import DraggableModal from "./forWatchList/DraggableModal";
import { MdAddCircle } from "react-icons/md";
import DeleteIcon from '@mui/icons-material/Delete';

function WatchList() {
  
  const {sharePrices} = useContext(RealTimeDataContext);
  const {watchListShares,addtoWatchList,deleteWatchList,setWatchListCount } = useContext(ShareContext);   

  const [showMyComponent, setShowMyComponent] = useState(false);
  const [buttonDetails, setButtonDetails] = useState(null);

  const [searchShare, setSearchShare] = useState(""); 
  const handleSearch = (event)=>{
    setSearchShare((event.target.value) )
  }
  
  const search = searchShare.toUpperCase();

  const useStyles = makeStyles({
    smallButton: {
      width: "30px",
      padding: "0px",
      margin: "0px",
      height: "28px",
    },
    });
   
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleOpen1 = () => setOpen1(true);
    const handleClose = () => setOpen(false);
    const handleClose1 = () => setOpen1(false);

    const handleAddWatchList = async(name) =>{
      
      const result =  await addtoWatchList({sharename: name}) ; 
      setWatchListCount(c=>c+1);
      setSearchShare("")
      
    }

    const handleDeleteWatchList = async(name) =>{
      await deleteWatchList(name);
      setWatchListCount(c=>c+1);
      console.log("Delete")
    }

    const handleBuy = (details)=>{
      setButtonDetails(details);
      handleOpen()
    }

    const handleSell = (details) =>{
      console.log(details)
      setButtonDetails(details);
      handleOpen1();
    }
  return (
    <>
      {/* <SearchBox /> */}
      <div className="searchInputField" style={{margin: '10px 0 '}}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              background: "rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Tooltip title="Search">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search"   >
                <SearchIcon />
              </IconButton>
            </Tooltip>

            <InputBase
              sx={{ ml: 1, flex: 1, color: "white" }}
              placeholder="Search Stock like RELIENCE, SBIN"
              onChange={handleSearch}
              value={searchShare}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          </Paper>
        </div>

<div className="mainWatchList" style={{color: "white"}}>
  <table>
    <thead>
      <tr>
        <th style={{width: '117.21px'}} >Sharename</th> 
        <th style={{width:'35px'}}></th>
        <th style={{width:'69px'}}>Buy</th>
        <th style={{width:'74.44px'}}>Sell</th>
        <th style={{width:'68.33px'}}>CHNG</th>
        <th style={{width:'75.88px'}}>LTP</th>
        <th style={{width:'71.29px'}}> %CHN.</th>
      </tr>
    </thead>
    <tbody>

   
{ (searchShare.length<3) ? 
(

 
  watchListShares.map((share)=>{
    
    if(sharePrices.length!==0){
      const {sharename, absoluteprice,percentegeprice, ltp, lastprice} = ((sharePrices.filter((fshare)=>{return fshare.sharename === share.sharename}))[0])
       
      return (
        <>
        {
          (buttonDetails) ? (
            <>
            {(buttonDetails.sharename === sharename)? (

            <> 
             {
              open === true ?
              <DraggableModal action={"Buy"} setButtonDetails={setButtonDetails} sharename={buttonDetails.sharename}  open={open} lastprice={buttonDetails.lastprice} handleclose={handleClose}/>
              : ""
            }

              {open1 === true ?
              <DraggableModal action={"Sell"} setButtonDetails={setButtonDetails} sharename={buttonDetails.sharename} open={open1} lastprice={buttonDetails.lastprice} handleclose={handleClose1}/> 
              :""
            }
            </>

            )
            
            :""}
           
          </>

          ):"" 
         
          }
          <tr>
           <td>
             {sharename}
           </td>
           <td style={{padding:"10px 0px"}}>
           <IconButton aria-label="delete"
             onClick={ ()=>handleDeleteWatchList(sharename)}
             className={classes.smallButton}>
         <DeleteIcon style={{color:'red'}} />
       </IconButton>
             </td> 
 
           <td  style={{padding:"5px 0px"}}>
           <Button
                   onClick={ ()=>handleBuy({...share, lastprice})}
                   className={classes.smallButton}
                   style={{ marginRight: "5px" }}
                   color="success"
                   variant="contained"
                   size="small"
                 >
                   Buy
                 </Button>
           </td>
           <td style={{padding:"0px 5px"}}>
           <Button
                    onClick={ ()=>handleSell(share)}
                   className={classes.smallButton}
                   color="error"
                   variant="contained"
                   size="small"
                 >
                   Sell
                 </Button>
           </td> 
           <td>{(absoluteprice).toFixed(2)}</td>
           <td>{(ltp).toFixed(2)}</td>
           <td>{(percentegeprice).toFixed(2)}</td>
          </tr>
       
       </>
     )
    }
    })

): (

  sharePrices.filter((share)=> share.sharename.includes(search)).map((share)=>{
    return (
      <>
     

{
          (buttonDetails) ? (
            <>
            {(buttonDetails.sharename === share.sharename)? (

            <> 
             {
              open === true ?
              <DraggableModal action={"Buy"} setButtonDetails={setButtonDetails} sharename={buttonDetails.sharename}  open={open} lastprice={buttonDetails.lastprice} handleclose={handleClose}/>
              : ""
            }

              {open1 === true ?
              <DraggableModal action={"Sell"} setButtonDetails={setButtonDetails} sharename={buttonDetails.sharename} open={open1} lastprice={buttonDetails.lastprice} handleclose={handleClose1}/> 
              :""
            }
            </>

            )
            
            :""}
           
          </>

          ):"" 
         
          }
         <tr>
          <td>
            {share.sharename}
          </td>
          <td style={{padding:"0px 0px"}}>
          <IconButton aria-label="delete"
            onClick={ ()=>handleAddWatchList(share.sharename)}
            // className={classes.smallButton}
            >
        < MdAddCircle style={{color:'green'}} />
      </IconButton>
            </td> 

          <td  style={{padding:"5px 0px"}}>
          <Button
                  onClick={ ()=>handleBuy(share)}
                  className={classes.smallButton}
                  style={{ marginRight: "5px" }}
                  color="success"
                  variant="contained"
                  size="small"
                >
                  Buy
                </Button>
          </td>
          <td style={{padding:"0px 5px"}}>
          <Button
                    onClick={ ()=>handleSell(share)}
                  className={classes.smallButton}
                  color="error"
                  variant="contained"
                  size="small"
                >
                  Sell
                </Button>
          </td> 
          <td>{(share.absoluteprice).toFixed(2)}</td>
          <td>{(share.ltp).toFixed(2)}</td>
          <td>{(share.percentegeprice).toFixed(2)}</td>
         </tr>
      </>
   
    )
  })

)
  
 
   
      
  
}
</tbody>
      </table>
</div>
    </>
  )
}

export default WatchList
