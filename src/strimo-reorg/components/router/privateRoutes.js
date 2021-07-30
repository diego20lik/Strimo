import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../navbar";
import Admin from "../navbar/admin";
import Creador from "../navbar/creador";
import Chat from "../chatstest";
export default function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser, role, nickname } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            {nickname ? (
              <>
                {role === "admin" && <Admin />}
                <Navbar seccion={true} />
                {role === "creador" && <Creador />}
                <Component {...props} />
              </>
            ) : (
              <Redirect to="/nickname" />
            )}
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
