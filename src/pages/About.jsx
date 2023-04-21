 
import React, { useState } from "react"
import moment from 'moment';

function About() {  

  const [time, setTime] = useState();
  // console.log(typeof(time))

  setInterval(()=>{
    setTime(moment().format('LTS'))
  },1000)

  // console.log(time)

  return (
    <div style={{height:'92.5vh'}}>
      <h1>This is About</h1>
       
      <h1>Time is Right Now : <span style={{color:'white'}}>{time}</span> </h1>
     
    </div>
  )
}

export default About
