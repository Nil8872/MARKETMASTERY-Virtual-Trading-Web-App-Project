import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login"; 
import LogoutIcon from "@mui/icons-material/Logout";
import { FaRegistered } from "react-icons/fa";
import Stack from "@mui/material/Stack"; 
import { useNavigate } from 'react-router-dom';
import UserContext from "../Context/UserContex"; 
function Navbar() { 
  
  const {user} = useContext(UserContext); 
  const location = useLocation();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const onLogoutHandler = () => { 
    localStorage.removeItem('token');
    navigate('/login', { replace: true });
  };

  const handleLogout = () => {
    onLogoutHandler(); // Call the logout handler to redirect the user to /login
  };
 

  return (
    <>
      <nav
        className="navbar navbar-expand-lg bg-body-tertiary sticky-top"
        data-bs-theme="dark"
        style={{margin:'0px'}}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">
            MarketMastery
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Dashbord
                </Link>
              </li>
              
              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/order" ? "active" : ""
                  }`}
                  to="/order"
                >
                  Order
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/holding" ? "active" : ""
                  }`}
                  to="/holding"
                >
                  Holding
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/position" ? "active" : ""
                  }`}
                  to="/position"
                >
                  Position
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/fund" ? "active" : ""
                  }`}
                  to="/fund"
                >
                  Fund
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>

            </ul>
            <form className="d-flex" role="search">
              {!token?(
                  <Stack direction="row" spacing={1}>
                  <Link style={{marginRight: '4px'}}  className="navbar-brand"  to="/login">
                    <Button variant="contained" startIcon={<LoginIcon />}>
                      Login
                    </Button>
                  </Link>
  
                  <Link className="navbar-brand" to="/register">
                    <Button variant="contained" endIcon={<FaRegistered />}>
                      Register
                    </Button>
                  </Link>
                </Stack>
              ):(
                <Stack direction="row" spacing={2}>
                <Button style={{marginRigth: '5px', borderRadius:'50%'}} className="navbar-brand" variant="contained" >
                      {user.name} 
                    </Button> 
                  <Button onClick={handleLogout} variant="contained" startIcon={<LogoutIcon />}>
                    Logout
                  </Button>
                  </Stack>
              )}
              
              
            </form>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
