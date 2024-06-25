import React from "react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { assets } from "../../assets/assets";
import { useContext } from 'react';
import { UserContext } from "../../context/User";
import { HashLink, NavHashLink } from 'react-router-hash-link';
import { StoreContext } from "../../context/StoreContext";


export default function Navbar({setShowLogin}) {
  //const [query,setQuery] = useState('');
  //const filteredItems = getFilteredItems(query, items);
  
  const {getTotalCartAmount} = useContext(StoreContext);

  const [menu,setMenu] =useState("home");
  //<a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active":""}>mobile-app</a>

  //const {getFilteredItems} = useContext(StoreContext);

  const {userName, setUserName, setUserToken} = useContext(UserContext);
  const navigate = useNavigate();
  const logout = ()=>{
    localStorage.removeItem('userToken');
    setUserToken(null);
    setUserName(null);
    navigate('/');
    //setShowLogin(true);
  };
  //console.log(useContext(UserContext));
  //const {userName} = useContext(UserContext);
  /*
  const [menu, setMenu] = useState("Menu");
        <li onClick={()=>setMenu("Contact")} className={menu === "Contact" ? "active" : ""}>Contact</li>
        */

        const handelChange = (e)=>{
          console.log(e.target.value);
        }
  return (
    <div className="navbar">
    <Link to={'/'}><img src={assets.logo} alt="" className="logo" /></Link>
      <ul className="navbar-menu">     
        {
          userName?
          <>
          <li className="nav-item"><Link smooth to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link></li>
          <a href="/#explore-category" onClick={()=>setMenu("menu")} className={menu==="menu" ? "active" :""}>Category</a>
          <li className="nav-item"><Link smooth to='/' onClick={()=>setMenu("welcome")} className={menu==="welcome" ? "active" :""} >Welcome {userName}</Link></li>

          </>
          :
          <>
          <Link to='/' onClick={()=>setMenu("home")} className={menu==="home" ? "active" :""}>Home</Link>
      <a href="#explore-category" onClick={()=>setMenu("menu")} className={menu==="menu" ? "active" :""}>Category</a>
      <a href="#app-download" onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app" ? "active" :""}>mobile-app</a>
      <a href="#footer" onClick={()=>setMenu("contact-us")} className={menu==="contact-us" ? "active" :""}>Contact Us</a>
          </>
        }
      </ul>
      <div className="navbar-right">
        <img src={assets.search_icon} alt="" />
        <div className="navbar-search-icon">
          <input type="search" placeholder="Search category" name="userName" onChange={e=>setQuery(e.target.value)} className="search-input"/>
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount()===0?"":"dot"}></div>
        </div>
        {userName?<button onClick={logout}>Logout</button>:<button onClick={()=>setShowLogin(true)}>sign in</button>}
      </div>

</div>
  );
}
