import "./App.css";
import React from "react";
import Home from "./Componet/Home";
import Navbar from "./Componet/Navbar";
import About from "./Componet/About";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import NoteState from "./Context/NoteState";
import Login from "./Componet/Login";
import Register from "./Componet/Register";
import UserDetail from "./Context/UserDetail";
import Order from "./Componet/Order";
import Position from "./Componet/Position";
import Holding from "./Componet/Holding";
import Fund from "./Componet/Fund";
 

function App() {
  return (
    <div style={{ height: "100%" }} className="background-radial-gradient ">
      <UserDetail>
        <NoteState>
          <Router>
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/order" element={<Order/>} />
              <Route path="/position" element={<Position/>} />
              <Route path="/holding" element={<Holding/>} />
              <Route path="/fund" element={<Fund/>} />
            </Routes>
          </Router>
        </NoteState>
      </UserDetail>
    </div>
  );
}
  
export default App;
