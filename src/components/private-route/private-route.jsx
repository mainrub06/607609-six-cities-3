import React from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AUTHORIZATION_STATUS } from "../../const";
import { getAuthStatus } from "../../reducer/user/selectors";

const PrivateRoute = ({
  render,
  path,
  exact,
  authorizationStatus,
  redirectLink,
}) => {
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

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  redirectLink: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
});

export { PrivateRoute };
export default connect(mapStateToProps)(PrivateRoute);
