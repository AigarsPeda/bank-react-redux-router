import React from "react";
import { Route, Switch } from "react-router-dom";

// pages
import DashboardPage from "../pages/dashboardPage/DashboardPage";
import DepositPage from "../pages/depositPage/DepositPage";
import LoginPage from "../pages/loginPage/LoginPage";
import NoMatchPage from "../pages/NoMatch/NoMatchPage";
import ProfilePage from "../pages/profilePage/ProfilePage";
import SignUpPage from "../pages/signUpPage/SignUpPage";
import AuthRoute from "../utils/AuthRoute";

const AppRoutes: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/signup" component={SignUpPage} />
      <Route exact path="/login" component={LoginPage} />
      <AuthRoute exact path="/" component={DashboardPage} />
      <AuthRoute exact path="/profile" component={ProfilePage} />
      <AuthRoute exact path="/deposit/:id" component={DepositPage} />

      <Route component={NoMatchPage} />
    </Switch>
  );
};

export default AppRoutes;
