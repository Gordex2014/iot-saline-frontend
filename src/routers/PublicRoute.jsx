import { Redirect, Route } from "react-router";

import PropTypes from "prop-types";

export const PublicRoute = ({ isAuthenticated, ...rest }) => {
  return isAuthenticated ? <Redirect to="/" /> : <Route {...rest} />;
};

PublicRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};
