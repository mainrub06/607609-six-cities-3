import React from "react";
import PropTypes from "prop-types";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {LINKS} from "../../const";
import {AUTHORIZATION_STATUS} from "../../const";
import {getAuthStatus} from "../../reducer/user/selectors";

const PrivateRoute = ({render, path, exact, authorizationStatus}) => {
  return (
    <Route
      path={path}
      exact={exact}
      render={() => {
        return (
          authorizationStatus === AUTHORIZATION_STATUS.AUTH
            ? render()
            : <Redirect to={LINKS.LOGIN} />
        );
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state)
});

PrivateRoute.propTypes = {
  render: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
  exact: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired
};

export {PrivateRoute};
export default connect(mapStateToProps)(PrivateRoute);
