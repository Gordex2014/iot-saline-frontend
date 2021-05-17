import { Redirect, Route } from "react-router";

import PropTypes from "prop-types";

export const PrivateRoute = ({ isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Route {...rest} /> : <Redirect to="/login" />;
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
