import React from "react";
import "../dashbord.css";
 
import WatchList from "./WatchList";
import Sidebar from "./Sidebar";


  function Format() {
 

  return (
    <div className="main-Container">
      <div className="watchListContainer" >
        <WatchList/>
      </div>
      <div className="sidebarContainer" style={{paddingLeft:"20px"}}>
        <Sidebar/>

      </div>
    </div>
  );
}

export default Format;
