import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { AuthContext } from "../App";

interface ProtectedRouteProps {
  component: any;
  path: string;
}
function ProtectedRoute({
  component: Comp,
  path,
  ...rest
}: ProtectedRouteProps) {
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
