import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../App";

function ProtectedRoute({ component: Comp, path, ...rest }) {
  const { user, userLoading } = useContext(AuthContext);

  return userLoading ? null : (
    <Route
      path={path}
      {...rest}
      render={props => {
        return user ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default ProtectedRoute;
