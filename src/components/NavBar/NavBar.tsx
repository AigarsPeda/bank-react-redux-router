import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ExitIcon from "../../images/svg/ExitIcon";
import { logOutUser } from "../../redux/actions/auth";
import { RootStateType } from "../../redux/reducers";

const NavBar: React.FC = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootStateType) => ({
    user: state.user.user
  }));

  return (
    <nav className="nav-bar">
      <div className="nav-bar-link">
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/payments">Payments</Link>
          </li>
          <li>
            <Link to="/services">Services</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        </ul>
      </div>
      <div className="nav-bar-profile">
        <Link to="/profile">{user.name}</Link>
        <ExitIcon onClick={() => dispatch(logOutUser())} />
      </div>
    </nav>
  );
};

export default NavBar;
