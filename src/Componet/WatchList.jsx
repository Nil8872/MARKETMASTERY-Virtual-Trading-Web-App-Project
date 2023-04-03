import React from 'react'
import OneShare from "./forWatchList/OneShare";
import SearchBox from "./forWatchList/SearchBox";
import data from './RealTimeData.js'

function WatchList() {
  return (
    <>
      <SearchBox />

<div className="mainWatchList" >
{
  data.map((share)=>{
    return (
      <OneShare key={share.shareName} shareName={share.shareName} absolutePrice={share.absolutePrice} percentegePrice={share.percentegePrice} lastPrice={share.lastPrice} />
      
    )
  })
}
</div>
    </>
  )
}

export default WatchList
