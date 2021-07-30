import React, { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/authContext";
import LogNavbar from "./navbar.jsx";
import NotLogNavbar from "./navbarSinLog.jsx";
function CambiarRole() {
  const { currentUser } = useAuth();
  return (
    <>
      {currentUser ? (
        <>
          <LogNavbar />
        </>
      ) : (
        <>
          <NotLogNavbar />
        </>
      )}
    </>
  );
}

export default CambiarRole;
