import React from "react";
import { connect } from "react-redux";
import { Redirect, RouteChildrenProps } from "react-router-dom";
import { RootState } from "../../redux/reducers";
import { callAPI } from "../../services/callAPI";

type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  RouteChildrenProps;

const DashboardPage: React.FC<Props> = (props) => {
  const { isAuthenticated } = props;

  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }

  const test = async () => {
    const res = await callAPI({ url: "/transactions/1", method: "get" });

    console.log("RES: ", res);
  };

  return (
    <div>
      <h1>Dashboard Page</h1>
      <button onClick={test}>Test</button>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
