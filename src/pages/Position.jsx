import React,{useContext} from 'react'
import WatchList from "../Componet/WatchList";
import { Navigate } from "react-router-dom";
import PositionSidebar from '../Componet/PositionSidebar';


function Position() {
  const token = localStorage.getItem('token');
 
  return (
    <>

{(token === null) ? (
      <Navigate to="/login" replace={true}/>
    ) : (
       <div style={{ height: "92.5vh", display: "flex" }} className="container">
        <div className="main-Container">
          <div className="watchListContainer">
            <WatchList />
          </div>
          <div className="sidebarContainer">
            <PositionSidebar/>
          </div>
        </div>
      </div>
       )   }
    </>
  )
}

export default Position
