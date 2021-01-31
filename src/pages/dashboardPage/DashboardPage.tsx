import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import AccountOverview from "../../components/AccountOverview/AccountOverview";
import NavBar from "../../components/NavBat/NavBar";
import { RootStateType } from "../../redux/reducers";

type Props = {};

const DashboardPage: React.FC<Props> = React.memo(() => {
  const { isAuthenticated } = useSelector((state: RootStateType) => ({
    isAuthenticated: state.auth.isAuthenticated
  }));

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
});

export default DashboardPage;
