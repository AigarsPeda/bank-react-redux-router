import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// image
import sightWheel from "../../images/sight-wheel.jpg";
import { logInUser } from "../../redux/actions/auth";
import { RootStateType } from "../../redux/reducers";

const LoginPage: React.FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state: RootStateType) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error.error
  }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(logInUser(user));
  };

  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="login-page">
      <div className="login-form-container">
        <h1>Every Spending Counts. Keep track of it.</h1>
        <h3>Log In</h3>
        <p>Enter your credentials to proceed</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            value={user.email}
            onChange={handleChange}
            name="email"
            autoComplete="on"
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={user.password}
            onChange={handleChange}
            name="password"
            autoComplete="off"
          />
          <span className="login-page-error">{error && `* ${error}`}</span>

          <button type="submit">Login</button>
          <Link to="/signup">Don&apos;t have a account?</Link>
        </form>
      </div>

      <div className="login-image-container">
        <img src={sightWheel} alt="black and white house" />
      </div>
    </div>
  );
};

export default LoginPage;
