import React, { useContext } from "react";
import { Redirect, Route, RouteProps } from "react-router-dom";
import { AuthContext } from "../App";
import { UserAuthority } from "../../types";

interface ProtectedRouteProps {
  component: React.ElementType;
  path: string;
  authorities?: UserAuthority[];
}
function ProtectedRoute({
  component: Comp,
  path,
  authorities,
  ...rest
}: ProtectedRouteProps & RouteProps) {
  const { user, userLoading } = useContext(AuthContext);

  function hasAccess() {
    const required = authorities ?? [];
    return (
      user &&
      required.every((authority) => user.authorities.includes(authority))
    );
  }

  return userLoading ? null : (
    <Route
      path={path}
      {...rest}
      render={(props) => {
        return hasAccess() ? <Comp {...props} /> : <Redirect to="/" />;
      }}
    />
  );
}

export default ProtectedRoute;
