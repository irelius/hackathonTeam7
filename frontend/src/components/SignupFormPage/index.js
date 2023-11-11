import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import { Provider } from "react-redux";
import configureStore from "../../store";
import "./index.css";
import { NavLink, useHistory } from "react-router-dom/cjs/react-router-dom.min";

const store = configureStore();

function SignupFormPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  // if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          // firstName,
          // lastName,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  const handleAdmin = async (e) => {
    e.preventDefault();

    const credential = "AdminUser";
    const password = "password";

    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  const handleCustomer = async (e) => {
    e.preventDefault();

    const credential = "DemoUser";
    const password = "password";

    const data = await dispatch(sessionActions.login({ credential, password }));
    if (data) {
      setErrors(data);
    }
  };

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  return (
    <div className="form-container signup">
      {/* <h2>Project: Impossible</h2> */}
      <div className="signup-back-button pointer" onClick={() => history.push('/')}>
        <i className='bx bx-x-circle'></i>
      </div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <div className="field-group">
            {/* <div className="field">
              <label>First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              {errors.firstName && <p>{errors.firstName}</p>}
            </div>
            <div className="field">
              <label>Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              {errors.lastName && <p>{errors.lastName}</p>}
            </div> */}
          </div>
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <p>{errors.email}</p>}
          </div>
          <div className="field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            {errors.username && <p>{errors.username}</p>}
          </div>
          <div className="field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {errors.password && <p>{errors.password}</p>}
          </div>
          <div className="field">
            <label>Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
          </div>
          <button type="submit" className="submit-button">Sign Up</button>
          <hr></hr>
          <div>
            <p>
              Already have an account?
              <NavLink to={"/login"}>
                <button type="button" className="demo-button">
                  Login
                </button>
              </NavLink>
            </p>
            <p>
              Demo
              <button
                type="button"
                className="demo-button"
                onClick={handleAdmin}
              >
                Admin
              </button>
              <button
                type="button"
                className="demo-button"
                onClick={handleCustomer}
              >
                Customer
              </button>
            </p>
          </div>
          <div>
            <button onClick={() => history.push('/')} id="cancel-button">Cancel</button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupFormPage;
