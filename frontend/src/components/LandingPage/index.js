import { NavLink } from "react-router-dom";
import "./LandingPage.css"

function LandingPage() {
  return (
    <>
      <div className="landing-container">
        <div className="landing left">
          <div className="header-title">
            <h1>Discover Luxury Furniture for Your Dream Home</h1>
            <p>Experience the epitome of elegance and comfort.</p>
          </div>
          <div className="header-btn">
            <NavLink to="/all">
              <button className="auth-btn main">Shop Now</button>
            </NavLink>
            {/* <button>Learn More</button> */}
          </div>
        </div>
        <div className="landing right">
            <p>Grid of 2x3 images maybe 3d models,staggered</p>
        </div>
      </div>
    </>
  );
}

export default LandingPage;
