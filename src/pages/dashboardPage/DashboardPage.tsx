import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import AccountOverview from "../../components/AccountOverview/AccountOverview";
import NavBar from "../../components/NavBat/NavBar";
import { RootState } from "../../redux/reducers";

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteChildrenProps;

const DashboardPage: React.FC<Props> = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  // const test = async () => {
  //   const res = await callAPI({ url: "/transactions/1", method: "get" });

  //   console.log("RES: ", res);
  // };

  return (
    <div className="dashboard-page">
      <div className="dashboard-actions">
        <h3>Search</h3>
      </div>

      <main className="dashboard-main">
        <NavBar />
        <AccountOverview />
      </main>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
