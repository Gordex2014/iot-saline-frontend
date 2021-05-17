import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, BrowserRouter as Router, Switch } from "react-router-dom";
import { startChecking } from "src/actions/auth";

import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

// Containers
const TheLayout = React.lazy(() => import("../containers/TheLayout"));

// Pages
const Login = React.lazy(() => import("../views/pages/login/Login"));

export const AppRouter = () => {
  const dispatch = useDispatch();
  const { id } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(startChecking());
  }, [dispatch]);

  const loader = (
    <div className="pt-3 text-center">
      <div className="sk-spinner sk-spinner-pulse"></div>
    </div>
  );

  return (
    <Router>
      <React.Suspense fallback={loader}>
        <Switch>
          <PublicRoute
            exact
            path="/login"
            name=""
            render={(props) => <Login {...props} />}
            isAuthenticated={!!id}
          />
          <PrivateRoute
            path="/"
            name="Home"
            render={(props) => <TheLayout {...props} />}
            isAuthenticated={!!id}
          />
          <Redirect to="/login" />
        </Switch>
      </React.Suspense>
    </Router>
  );
};
