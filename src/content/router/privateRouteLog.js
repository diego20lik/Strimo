import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../navbar/navbarSinLog.jsx";
export default function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <Redirect to="/streaming" />
        ) : (
          <>
            <Navbar tipo="login" />
            <Component {...props} />
          </>
        );
      }}
    ></Route>
  );
}
