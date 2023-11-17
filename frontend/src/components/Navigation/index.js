import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import "./index.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import SideBar from "./SideBar";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const currentPath = useLocation().pathname;
  const isActive = (path) => path === currentPath;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const baseLinks = (
    <>
      <div className="logo-header">
        <NavLink exact to="/" className="home-link">
          <img
            className="logo"
            src="../../../assets/logo2.png"
            alt="Logo"
          ></img>
          <h3>3DEA</h3>
        </NavLink>
        <button className="nav-btn">Shop</button>
        <button className="nav-btn">About Us</button>
        <button className="nav-btn">Showroom</button>
        <button className="nav-btn">Menu</button>
      </div>
      {/* <li id="test">
        <button onClick={toggleSidebar} className="toggle">
          <i className="bx bx-menu"></i>
        </button>
        <NavLink
          exact
          to="/"
          className={`home-btn ${isActive("/") ? "active" : ""}`}
        >
          <i className="bx bxs-home"></i>
        </NavLink>
        {isSidebarOpen && <SideBar isSidebarOpen={isSidebarOpen} />}
      </li> */}
    </>
  );

  const sessionLinks = sessionUser ? (
    <>
      {baseLinks}
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    </>
  ) : (
    <>
      {baseLinks}
      <li>
        <NavLink to="/signup">
          <button className="auth-btn signup">Sign Up</button>
        </NavLink>
        <NavLink to="/login">
          <button className="auth-btn">Log In</button>
        </NavLink>
      </li>
    </>
  );

  return (
    <>
      <div id="nav">{isLoaded && sessionLinks}</div>
    </>
  );
}

export default Navigation;
