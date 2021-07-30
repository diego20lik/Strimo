import React from "react";
import { Link } from "react-router-dom";
function Admin() {
  return (
    <>
      <nav className="navbar navbar-expand-md  navbar-collapse navbar-dark bg-dark color-set">
        <h5 className="blanco">Admin Nav</h5>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbarAdmin"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="collapsibleNavbarAdmin">
          <ul className="navbar-nav w-100">
            <div className="nav-left ml-auto float-right text-right">
              <li className="nav-item">
                <Link className="nav-link m-0" to="/peticiones-conciertos">
                  <p className="m-0">Peticiones Conciertos</p>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/cambiar-role">
                  <p className="m-0">Cambiar Role de usuario</p>
                </Link>
              </li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Admin;
