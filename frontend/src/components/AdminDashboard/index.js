import { NavLink, Route, Switch } from "react-router-dom";
import SettingsSection from "./Sections/SettingsSection";
import "./AdminDashboard.css"

function AdminDashboard() {
  // const [expanded, setExpanded] = use


  return (
    <>
      <div className="admin-container">
        <div className="admin-sidebar">
          <p>Logo and Company</p>

          <div className="sidebar-btn-container">
            <NavLink to="/admin/dashboard">
              <button>Dashboard</button>
            </NavLink>
            <NavLink to="/admin/orders">
              <button>Orders</button>
            </NavLink>
            <NavLink to="/admin/products">
              <button>Products</button>
            </NavLink>
            <NavLink to="/admin/customers">
              <button>Customers</button>
            </NavLink>
            <NavLink to="/admin/reviews">
              <button>Reviews</button>
            </NavLink>
            <NavLink to="/admin/promo">
              <button>Marketing and Promotions</button>
            </NavLink>
            <NavLink to="/admin/payments">
              <button>Payments</button>
            </NavLink>
            <NavLink to="/admin/settings">
              <button>Settings</button>
            </NavLink>
          </div>

          {/* <button>Notifications</button> */}
          {/* future update */}
        </div>
        <div className="admin-main">
          <div className="admin-navbar"></div>
          <div className="admin-content">
            <Switch>
              <Route path="/admin/dashboard">
                {/* Render your Dashboard component */}
              </Route>
              <Route path="/admin/orders">
                {/* Render your Orders component */}
              </Route>
              <Route path="/admin/products">
                {/* Render your Products component */}
              </Route>
              <Route path="/admin/customers">
                {/* Render your Customers component */}
              </Route>
              <Route path="/admin/reviews">
                {/* Render your Reviews component */}
              </Route>
              <Route path="/admin/promo">
                {/* Render your Marketing and Promotions component */}
              </Route>
              <Route path="/admin/payments">
                {/* Render your Payments component */}
              </Route>
              <Route exact path="/admin/settings">
                <SettingsSection />
              </Route>
            </Switch>
          </div>
          <div className="admin-extra">
            <div className="extra left"></div>
            <div className="extra right"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
