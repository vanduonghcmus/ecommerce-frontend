import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuth = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: {
                from: props.location,
              },
            }}
          />
        );
      }}
    />
  );
};

export default PrivateRoute;
