 
import React,{useContext} from 'react'
import ShareContext from '../Context/ShareContext';  

function About() {
  const {shares, setCount} = useContext(ShareContext); 
  setCount(c=>c+1);
console.log(shares);
  return (
    <div style={{height:'92.5vh'}}>
      <h1>This is About</h1>
      {
        shares.map((item)=>{
          <p style={{color: 'white'}}>${item}</p>
        })
        
      }
     
    </div>
  )
}

export default About
