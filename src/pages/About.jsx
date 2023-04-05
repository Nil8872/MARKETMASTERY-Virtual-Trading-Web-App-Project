 
import React,{useState} from 'react'  
import Button from "@mui/material/Button";  
import Modal from '@mui/material/Modal';

 

function About() {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 

  const handleTouchStart = (e) => {
    e.preventDefault();
    const startX = e.touches[0].clientX;
    const startY = e.touches[0].clientY;
  
    const onTouchMove = (e) => {
      const deltaX = e.touches[0].clientX - startX;
      const deltaY = e.touches[0].clientY - startY;
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
    };
  
    document.addEventListener('touchmove', onTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);
  };
  
  const handleTouchEnd = () => {
    document.removeEventListener('touchmove', handleTouchStart);
    document.removeEventListener('touchend', handleTouchEnd);
  };  

  const handleDragStart = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;

    const onMouseMove = (e) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      setPosition((prevPosition) => ({
        x: prevPosition.x + deltaX,
        y: prevPosition.y + deltaY,
      }));
    };

    document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', handleDragEnd);
  };

  const handleDragEnd = () => {
    document.removeEventListener('mousemove', handleDragStart);
    document.removeEventListener('mouseup', handleDragEnd);
  };

  const modalStyle = {
    top: `${position.y}%`,
    left: `${position.x}%`,
    transform: `translate(-${position.x}%, -${position.y}%)`,
    position: 'absolute',
  width: '300px', // set the width of the modal
  height: '300px',
   // set the height of the modal
   border: '2px solid white'
  };


  return (
    <div style={{height:'92.5vh'}}>
      <h1>This is About</h1>
    
      {/* <BasicModal/>
      <Modal showModal={true}/> */}

<Modal open={open} onClose={handleClose}>
      <div style={modalStyle} onDragStart={handleDragStart} onTouchStart={handleTouchStart} draggable>
        {/* {children} */}
        <h1 style={{color:'white'}}>Nilesh</h1>
        <Button onClick={handleClose}>Close</Button>
      </div>
    </Modal>

    <Button onClick={handleOpen}>Open</Button>
    </div>
  )
}

export default About
