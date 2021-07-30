import React, { useState, useEffect } from "react";
import logo from "../../images/strimo logo.png";
import { Link } from "react-router-dom";
import fileSaver from "file-saver";
import "../../styles/navbar.css";
function Navbar({ tipo }) {
  function handlePDF() {
    fileSaver.saveAs(process.env.PUBLIC_URL + "/PDF/STRIMO.pdf", "STRIMO.pdf");
  }
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-collapse navbar-light color-set">
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
                    <Link className="nav-link" to="/streaming">
                      <h4>Launch App</h4>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handlePDF}>
                      <h4>Download PDF</h4>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#newsteller">
                      <h4>Newsteller</h4>
                    </a>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    <h4>Landing Page</h4>
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
