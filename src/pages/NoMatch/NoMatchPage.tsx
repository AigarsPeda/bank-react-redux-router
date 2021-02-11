import React from "react";
import { Link } from "react-router-dom";

const NoMatch: React.FC = () => {
  return (
    <div>
      <h1>404</h1>
      <Link to="/">Home</Link>
    </div>
  );
};

export default NoMatch;
