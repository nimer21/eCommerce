import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from 'react';
import { UserContext } from "../../context/User";

export default function Navbar({setShowLogin}) {
  const {userName, setUserName, setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/Login');
  };
  //console.log(useContext(UserContext));
  //const {userName} = useContext(UserContext);
  /*
  const [menu, setMenu] = useState("Menu");
        <li onClick={()=>setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</li>
        */
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
    <img src={assets.logo} alt="" className="logo" />
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
      <li className="nav-item"><NavLink className="nav-link" to='/'>Home</NavLink></li>
        {
          userName?
          <>
          <li className="nav-item"><NavLink className="nav-link" to='/Categories'>Categories</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to='/'>Welcome {userName}</NavLink></li>
          <li className="nav-item"><button onClick={logout}>Logout</button></li>

          <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
        <NavLink className="nav-link" to='/Cart'>
          <img src={assets.basket_icon} alt=""/>
          </NavLink>
          <div className="dot"></div>
        </div>
      </div>
          </>
          :
          <>
          
          <li className="nav-item"><NavLink className="nav-link" to='/Categories'>Categories</NavLink></li>
          <li className="nav-item"><NavLink className="nav-link" to='/Register'>Register {userName}</NavLink></li>
           <div className="navbar-right">
        <button onClick={()=>setShowLogin(true)}>sign in</button>
      </div>
          </>
        }
      </ul>
    </div>
    </div>
</nav>
  );
}
