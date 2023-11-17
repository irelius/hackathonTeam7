import { NavLink } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';

function AdminDashboard() {
    

    // const [expanded, setExpanded] = use

    return (
        <>
        <div className="admin-container">
            <div className="admin-sidebar">
            <p>Logo and Company</p>

            <div className="sidebar-btn-container">
                
            <NavLink>
            <button>Dashboard</button>
                
            </NavLink>
            <NavLink>
            <button>Orders</button>

            </NavLink>
            <NavLink>
            <button>Products</button>

            </NavLink>
            <NavLink>
            <button>Customers</button>

            </NavLink>
            <NavLink>
            <button>Reviews</button>

            </NavLink>
            <NavLink>
            <button>Payments</button>

            </NavLink>
            <NavLink>
            <button>Settings</button>
            </NavLink>
            </div>

            {/* <button>Notifications</button> */}
            {/* future update */}

            </div>
            <div className="admin-main">
            <div className="admin-navbar">

            </div>
            <div className="admin-content">
                <Switch>

                    <Route>
                        
                    </Route>
                    <Route>

                    </Route>
                    <Route>

                    </Route>
                    <Route>

                    </Route>
                    <Route>

                    </Route>
                    <Route>

                    </Route>
                    <Route>

                    </Route>
                </Switch>

            </div>
            <div className="admin-extra">
            <div className="extra left">

            </div>
            <div className="extra right">

            </div>
            </div>
            </div>

        </div>
        </>
    )
}
