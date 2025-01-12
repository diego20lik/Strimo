import React, { useState, useEffect } from "react";
import logo from "../images/strimo logo.png";
import { Link } from "react-router-dom";
import fileSaver from "file-saver";
import "./navbar.css";
function Navbar({ tipo }) {
  function handlePDF() {
    fileSaver.saveAs(process.env.PUBLIC_URL + "/PDF/STRIMO.pdf", "STRIMO.pdf");
  }
  return (
    <>
      <nav className="navbar p-4 navbar-expand-md navbar-collapse navbar-light color-set">
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" width="250px" />
          </Link>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav ml-auto">
            <div className="nav-left">
              {tipo === "inicio" ? (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/pre">
                      <h4>Lanzar App</h4>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#inicio">
                      <h4>Inicio</h4>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#funcion">
                      <h4>Somos Strimo</h4>
                    </a>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handlePDF}>
                      <h4>Descarga PDF</h4>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#newsteller">
                      <h4>Noticiero</h4>
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <h4>Página de Inicio</h4>
                  </a>
                </li>
              )}
              <li className="nav-item space P-3"></li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
