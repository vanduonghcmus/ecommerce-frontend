import React from "react";
import { Route, Redirect } from "react-router-dom";
import { isAuthenticated } from "./index";

const AdminRoute = ({ component: Component, ...rest }) => {
  const isAuth = isAuthenticated();

  return (
    <Route
      {...rest}
      render={(props) => {
        return isAuth && isAuth.user.role === 1 ? (
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

export default AdminRoute;
