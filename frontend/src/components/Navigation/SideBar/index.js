import { NavLink,useLocation, } from "react-router-dom/cjs/react-router-dom.min";
import "./SideBar.css";

function SideBar({ isSidebarOpen }) {
  const currentPath = useLocation().pathname;

  const isActive = (path) => path === currentPath;

  return (
    <>
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <div
          className="collapse show collapse-horizontal"
          id="collapseWidthExample"
        >
          <div className="sidebar-buttons">
            {/* <NavLink to="/gallery">
              <button
                className={`nav-btn ${isActive("/gallery") ? "active" : ""}`}
              >
                Gallery
              </button>
            </NavLink>
            <NavLink to="/products">
              <button
                className={`nav-btn ${isActive("/products") ? "active" : ""}`}
              >
                Models
              </button>
            </NavLink> */}
            <NavLink to="/reviews">
              <button
                className={`nav-btn ${isActive("/reviews") ? "active" : ""}`}
              >
                Reviews
              </button>
            </NavLink>
            <NavLink to="/orders">
              <button
                className={`nav-btn ${isActive("/orders") ? "active" : ""}`}
              >
                Orders
              </button>
            </NavLink>
            <NavLink to="/cart">
              <button
                className={`nav-btn ${isActive("/cart") ? "active" : ""}`}
              >
                <i className="bx bx-cart"></i>
                Cart
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
