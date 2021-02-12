import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import building from "../../images/building.jpg";
import { signUpUser } from "../../redux/actions/auth";
import { RootStateType } from "../../redux/reducers";

const SignUpPage: React.FC = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, error } = useSelector((state: RootStateType) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error.error
  }));

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((state) => ({
      ...state,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signUpUser(user));
  };

  // after sign up redirect
  if (isAuthenticated) {
    return <Redirect to="/" />;
  }

  return (
    <div className="signup-page">
      <div className="signup-page-image-container">
        <img src={building} alt="black and white bilging" />
      </div>
      <div className="signup-page-form-container">
        <h1>Every Spending Counts. Keep track of it.</h1>
        <h3>Sign Up</h3>
        <p>Enter your credentials to proceed</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={user.name}
            onChange={handleChange}
            name="name"
            autoComplete="on"
          />
          <label htmlFor="surname">Surname</label>
          <input
            type="text"
            value={user.surname}
            onChange={handleChange}
            name="surname"
            autoComplete="on"
          />
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
          <span className="signup-page-error">{error && `* ${error}`}</span>
          <button type="submit">Sign Up</button>
          <Link to="/login">Already have an account?</Link>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
