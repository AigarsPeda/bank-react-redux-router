import React from "react";
import { connect, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logOutUser } from "../../redux/actions/auth";
import ExitIcon from "../../images/svg/ExitIcon";

import { RootStateType } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { user } = props;
  const dispatch = useDispatch();

  // const location = useLocation();
  // const isMatch = matchPath(location.pathname, {
  //   path: ["/login", "/signup"],
  //   exact: true,
  //   strict: true
  // });

  // if there are match don't show nav bar
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
            <Link to="/currency">Currency</Link>
          </li>
        </ul>
      </div>
      <div className="nav-bar-profile">
        <h3>{user.name}</h3>
        <ExitIcon onClick={() => dispatch(logOutUser())} />
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootStateType) => ({
  user: state.user.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
