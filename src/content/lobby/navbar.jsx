import React from "react";
import logo from "../images/strimo__1_-removebg-preview_auto_x1.png";
import bellIcon from "../images/iconfinder_ICON_BASIC-19_7239011.svg";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
function Navbar() {
  const { logOut } = useAuth();
  const history = useHistory();
  const handleLogOut = async () => {
    try {
      await logOut();
      history.push("/login");
    } catch {
      alert("Algo a salido mal");
    }
  };
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-collapse navbar-light color-set">
        <div className="logo">
          <a className="navbar-brand" href="/placeholder">
            <img src={logo} alt="" width="200px" />
          </a>
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
            <li className="nav-item">
              <a className="nav-link" href="/">
                <h4>Inicio</h4>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/explora">
                <h4>Explora</h4>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/chats">
                <h4>Chats</h4>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/conciertos">
                <h4>Conciertos</h4>
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="/"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <h4>Perfil</h4>
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <button
                  className="nav-link"
                  onClick={() => {
                    handleLogOut();
                  }}
                >
                  <h4 style={{ whiteSpace: "nowrap" }}>Cerrar Sesión</h4>
                </button>
              </div>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/conciertos">
                <img src={bellIcon} alt="" width="40px" />
              </a>
            </li>
            <li className="nav-item space"></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
