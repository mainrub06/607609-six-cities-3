import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AUTHORIZATION_STATUS } from "../../const";
import { getAuthStatus } from "../../reducer/user/selectors";
import { IUser } from "../../types/user";

interface IPrivateRoute {
  render(): any;
  path: string;
  exact: boolean;
  authorizationStatus: string;
  redirectLink: string;
}

const PrivateRoute = ({
  render,
  path,
  exact,
  authorizationStatus,
  redirectLink,
}: IPrivateRoute) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return authorizationStatus === AUTHORIZATION_STATUS.AUTH ? (
          render()
        ) : (
          <Redirect to={redirectLink} />
        );
      }}
    />
  );
};

const mapStateToProps = (state: IUser) => ({
  authorizationStatus: getAuthStatus(state),
});

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
