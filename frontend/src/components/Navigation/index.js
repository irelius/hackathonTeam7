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

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <li id="test">
          <button onClick={toggleSidebar} className="toggle">
            <i className="bx bx-menu"></i>
          </button>
          <NavLink
            exact
            to="/"
            className={`home-btn ${isActive("/") ? "active" : ""}`}
          >
            <i className='bx bxs-home' ></i>
          </NavLink>
          {isSidebarOpen && <SideBar isSidebarOpen={isSidebarOpen} />}
        </li>
        <h3>Three-DEA</h3>
        <li>
          <ProfileButton user={sessionUser} />
        </li>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <li id="test">
          <button onClick={toggleSidebar} className="toggle">
            <i className="bx bx-menu"></i>
          </button>
          <NavLink
            exact
            to="/"
            className={`home-btn ${isActive('/') ? 'active' : ''}`}
          >
            <i className="bx bxs-home"></i>
          </NavLink>
          {isSidebarOpen && <SideBar isSidebarOpen={isSidebarOpen} />}
        </li>
        <h3>Three-DEA</h3>
        <li>
          <NavLink to="/login">
            <button className="auth-btn">Log In</button>
          </NavLink>
          <NavLink to="/signup">
            <button className="auth-btn signup">Sign Up</button>
          </NavLink>
        </li>
      </>
    );
  }

  return (
    <>
      <div id="nav">{isLoaded && sessionLinks}</div>
    </>
  );
}

export default Navigation;
