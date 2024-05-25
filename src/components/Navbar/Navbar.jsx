import React from "react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";

export default function Navbar() {
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
      <li className="nav-item"><NavLink className="nav-link" to='/Cart'>Cart</NavLink></li>
      <li className="nav-item"><NavLink className="nav-link" to='/Categories'>Categories</NavLink></li>

      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <img src={assets.basket_icon} alt="" />
          <div className="dot"></div>
        </div>
        <button>sign in</button>
      </div>
    </div>
    </div>
</nav>
  );
}
