import React from "react";
import Elementos from "./elementos.jsx";
import "../../styles/galeria.css";
import { Link } from "react-router-dom";
function index() {
  return (
    <>
      <div className="p-4 degradado">
        <div className="d-flex flex-column busqueda  align-items-center justify-content-center">
          <form className="d-flex w-100 mr-2">
            <input type="text" placeholder="Buscar" />
            <button
              className="primario"
              type="submit"
              style={{
                marginLeft: "10px",
                width: "10%",
                minWidth: "fit-content",
              }}
            >
              Buscar
            </button>
          </form>
        </div>
        <div className="crea blanco my-4">
          <Link style={{ textDecoration: "none" }} to="/crea">
            <h3 className="crea-link">Crea +</h3>
          </Link>
        </div>
        <hr />
        <Elementos />
      </div>
    </>
  );
}

export default index;
