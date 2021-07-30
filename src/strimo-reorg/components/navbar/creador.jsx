import React from "react";
import { Link } from "react-router-dom";
function Creador() {
  return (
    <>
      <nav className="navbar navbar-expand-md  navbar-collapse navbar-light bg-light color-set">
        <div className="collapse navbar-collapse " id="collapsibleNavbar">
          <ul className="navbar-nav w-100">
            <div className="nav-left ml-auto float-right text-right">
              <li className="nav-item">
                <Link className="nav-link m-0" to="/crear-stream">
                  <h5 className="m-0">Crear Evento</h5>
                </Link>
              </li>
              {/* <li className="nav-item">
                <Link className="nav-link" to="/">
                  <h5 className="m-0">Crear NFT</h5>
                </Link>
              </li> */}
              {/* <li className="nav-item">
                <Link className="nav-link" to="/cambiar-role">
                  <p className="m-0">Cambiar Role de usuario</p>
                </Link>
              </li> */}
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Creador;
