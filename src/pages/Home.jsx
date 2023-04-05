// import AddNote from "./AddNote";
import { Navigate } from "react-router-dom";
import Format from "../Componet/Format";
// import Notes from "./Notes";



function Home() {
  
  const token = localStorage.getItem('token');

  
  return (
    <>
    {(token === null) ? (
      <Navigate to="/login" replace={true}/>
    ) : (
      
<div style={{height:'92.5vh', display:'flex'}} className="container">
        {/* <AddNote/> */}
        {/* <Notes /> */}
        <Format/>
      </div>
    
    )   }
      
    </>
  );
}

export default Home;
