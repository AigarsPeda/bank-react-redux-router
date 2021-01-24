import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps;

const NavBar: React.FC<Props> = (props) => {
  const { user } = props;

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
            <Link to="/dashboard">Dashboard</Link>
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
      </div>
    </nav>
  );
};

const mapStateToProps = (state: RootState) => ({
  user: state.user.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
