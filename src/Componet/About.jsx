 
import React from 'react'
import BasicModal from './BasicModal'
import MyForm from './MyForm'
import Modal from './Modal'
 

function About() {
    

  return (
    <div>
      <h1>This is About</h1>
      <MyForm/>
      <BasicModal/>
      <Modal showModal={true}/>
    
    </div>
  )
}

export default About
