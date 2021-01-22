import React from "react";
import { matchPath, useLocation } from "react-router-dom";

const NavBar: React.FC = () => {
  const location = useLocation();
  const isMatch = matchPath(location.pathname, {
    path: ["/login", "/signup"],
    exact: true,
    strict: true
  });

  // if there are match don't show nav bar
  return isMatch ? null : (
    <div>
      <h3>Nav Bar</h3>
    </div>
  );
};

export default NavBar;
