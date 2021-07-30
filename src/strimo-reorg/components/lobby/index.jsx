import React /*{ useState }*/ from "react";
import { useLocation } from "react-router-dom";
// import Navbar from "./navbar";
import Index from "./contenido";
import { Link } from "react-router-dom";
import Err from "../popup/err";
import "../../styles/lobby.css";
function Lobby() {
  let location = useLocation();
  return (
    <div>
      <div className="degradado">
        <Index />
      </div>
    </div>
  );
}

export default Lobby;
