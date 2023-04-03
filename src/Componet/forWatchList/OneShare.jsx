import React,{useState} from "react"; 
import Button from "@mui/material/Button";
import { makeStyles } from '@material-ui/core/styles';
import Box from '@mui/material/Box'; 
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const useStyles = makeStyles({
  smallButton: {
    width: '30px',
    padding:'0px',
    margin:'0px',
    height: '28px',
  },
});

// const style = {
//   position: 'absolute',
//   top: '50%',
//   left: '50%',
//   transform: 'translate(-50%, -50%)',
//   width: 400,
//   bgcolor: 'background.paper',
//   border: '2px solid #000',
//   boxShadow: 24,
//   p: 4,
// };




function OneShare(props) {
  const { shareName, absolutePrice, percentegePrice, lastPrice } = props;
  const classes = useStyles();
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
 
  const modalStyle = {
    top: `${position.y}%`,
    left: `${position.x}%`,
    transform: `translate(-${position.x}%, -${position.y}%)`,
  };

  const style = {
  position: 'absolute',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  top: `${position.y}%`,
  left: `${position.x}%`,
  transform: `translate(-${position.x}%, -${position.y}%)`,
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  color: 'white',
  p: 4,
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
    document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', onMouseMove);
    });
  };

  return (
    <>
    
    {/* <Button onClick={handleOpen}>Open modal</Button> */}
      <Modal
        open={open}
        onClose={handleClose}
        // style={modalStyle}
        
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {/* <Box sx={style} draggable onDragStart={handleDragStart}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
          
        </Box> */}
        <div style={style} onDragStart={handleDragStart} draggable>
        <h1>Nilesh</h1>
        <Button onClick={handleClose}>Close</Button>
      </div>
      </Modal>

      <div className="share-list" style={{ fontSize: "14px" }}>
        <div className="share">
          <div className="symbol-wrapper">
            <div
              style={{ color: "rgba(255,255,255, 0.7)" }}
              className="shareName"
            >
              {shareName}
            </div>
            <div className="buySell">
              {/* <Box sx={{ "& button": { m: 1 } }}> */}
                <div style={{display:'flex'}}>
                  <Button onClick={handleOpen} className={classes.smallButton} style={{marginRight:'5px'}} color="success" variant="contained" size="small">Buy</Button>
                  <Button className={classes.smallButton} color="error" variant="contained" size="small">Sell</Button>
                </div>
              {/* </Box> */}
            </div>
          </div>
          <div className="price-wrapper">
            <div className="price-change">
              <div className="dim">
                <span style={{ color: "green" }} className="price-absolute">
                  {absolutePrice}
                </span>
                <span
                  className="price-percentage"
                  style={{ color: "rgba(255,255,255, 0.7)" }}
                >
                  {percentegePrice}
                  <span className="text-xxsmall">%</span>
                </span>
              </div>
            </div>
            <div className="price">
              <span style={{ color: "green" }} className="last-price">
                {lastPrice}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OneShare;
