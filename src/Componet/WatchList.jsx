import React from 'react'
import OneShare from "./forWatchList/OneShare";
import SearchBox from "./forWatchList/SearchBox";
import data from '../services/RealTimeData.js'

function WatchList() {
  return (
    <>
      <SearchBox />

<div className="mainWatchList" >
{
  data.map((share)=>{
    return (
      <OneShare key={share.sharename} sharename={share.sharename} absoluteprice={share.absoluteprice} percentegeprice={share.percentegeprice} lastprice={share.lastprice} />
      
    )
  })
}
</div>
    </>
  )
}

export default WatchList
