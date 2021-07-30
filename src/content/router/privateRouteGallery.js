import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Navbar from "../navbar/navbar.jsx";
import Chats from "../chatstest";
import Admin from "../navbar/admin";
import Creador from "../navbar/creador";
export default function PrivateRoutes({ component: Component, ...rest }) {
  const { currentUser, role, nickname } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        return currentUser ? (
          <>
            {nickname ? 
              <>
                {role === "admin" && <Admin />}
                <Navbar seccion={false} />
                {role === "creador" && <Creador />}
                <Component {...props} />
              </>
            :
              <Redirect to="/nickname"/>
            }
          </>
        ) : (
          <Redirect to="/login" />
        );
      }}
    ></Route>
  );
}
