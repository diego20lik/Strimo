import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../navbar/navbar.jsx";
import Chats from "../chatstest";
import Creador from "../navbar/creador";
export default function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser, role } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser && role === "creador" ? (
          <>
            <Navbar pre={true} />
            <Creador />
            <Component {...props} />
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
