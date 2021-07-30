import React, { useState, useEffect } from "react";
import logo from "../images/strimo logo.png";
import bellIcon from "../images/iconfinder_ICON_BASIC-19_7239011.svg";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import Notificaciones from "./Notificaciones";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { Link } from "react-router-dom";
import "./navbar.css";
function Navbar({ seccion, pre }) {
  const storage = firebase.storage();
  const notificaciones = firebase.firestore().collection("Notificaciones");
  const allInputs = { imgUrl: "" };
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const { currentUser, nickname } = useAuth();
  const { logOut } = useAuth();
  const history = useHistory();
  const [notificacion, setNotificacion] = useState([]);
  const [visto, setVisto] = useState(true);
  const [crearFotoDePerfil, setCrearFotoDePerfil] = useState(false);
  const changeState = async () => {
    if (!visto) {
      await notificaciones
        .where("usuario", "==", currentUser.uid)
        .get()
        .then((doc) => {
          doc.docs.map((datos) => {
            datos.ref.update({
              ...datos.data(),
              visto: true,
            });
          });
        });
      setVisto(true);
    }
  };
  const handleLogOut = async (e) => {
    try {
      await logOut();
      history.push("/login");
    } catch {
      alert("Algo a salido mal");
    }
  };
useEffect(() => {
    const unsubscriber = storage
      .ref(`users/${currentUser.uid}/pfp/`)
      .child(`pfp${currentUser.uid}`)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageAsUrl((prevObject) => ({
          ...prevObject,
          imgUrl: fireBaseUrl,
        }));
      })
      .then((doc) => {
        if (imageAsUrl.imgUrl === "") {
          setCrearFotoDePerfil(true);
        }
      });
    return unsubscriber;
  }, []);
  useEffect(() => {
    setNotificacion([]);
    const unsubsciber = notificaciones
      .where("usuario", "==", currentUser.uid)
      .orderBy("tiempo", "desc").limit(2)
      .onSnapshot(async (snapshot) => {
        let contenedor = [];
        await snapshot.docs.map((doc) => {
          contenedor.push(doc.data());
        });
        setNotificacion(contenedor);
      });
    return unsubsciber;
  }, []);
  useEffect(() => {
    if (notificacion.length > 0) {
      notificacion.map((doc) => {
        if (!doc.visto) {
          // console.log(doc.visto);
          setVisto(false);
        }
      });
    }
  }, [notificacion]);
  return (
    <>
      <nav className="navbar navbar-expand-md navbar-collapse navbar-light color-set">
        <div className="logo">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="" width="200px" />
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
          <ul className="navbar-nav w-100">
            <div className="nav-right">
              {pre ? (
                <>
                  <li className="">
                    <Link className="nav-link" to="/streaming">
                      <button className="tercero">
                        <h2>Streaming</h2>
                      </button>
                    </Link>
                  </li>
                  <li className="slash">
                    <h1>/</h1>
                  </li>
                  <li className="">
                    <Link className="nav-link" to="/galeria">
                      <button className="tercero">
                        <h2>Galería NFT</h2>
                      </button>
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  {seccion ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/streaming">
                          <button className="tercero">
                            <h2>
                              <b>Streaming</b>
                            </h2>
                          </button>
                        </Link>
                      </li>
                      <li className="slash">
                        <h1>/</h1>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/galeria">
                          <button className="tercero">
                            <h2>Galería NFT</h2>
                          </button>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/streaming">
                          <button className="tercero">
                            <h2>Streaming</h2>
                          </button>
                        </Link>
                      </li>
                      <li className="slash">
                        <h1>/</h1>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/galeria">
                          <button className="tercero">
                            <h2>
                              <b>Galería NFT</b>
                            </h2>
                          </button>
                        </Link>
                      </li>
                    </>
                  )}
                </>
              )}
            </div>
            <div className="nav-left float-right text-right ">
              {pre || (
                <>
                  {seccion ? (
                    <>
                      <li className="nav-item">
                        <Link className="nav-link" to="/streaming">
                          <h4>Inicio</h4>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link
                          className="nav-link nowrap"
                          to="/streaming-explora"
                        >
                          <h4>En Tu Zona</h4>
                        </Link>
                      </li>
                      <li className="nav-item link-to-chats text-left">
                        <Link className="nav-link" to="/chats">
                          <h4>Chats</h4>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/streaming-conciertos">
                          <h4>Conciertos</h4>
                        </Link>
                      </li>
                    </>
                  ) : (
                    <>
                      {/* <li className="nav-item">
                        <Link className="nav-link" to="/">
                          <h5>Colecciones</h5>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          <h5>Clasificaciones</h5>
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link" to="/">
                          <h5>Comunidad</h5>
                        </Link>
                      </li> */}
                    </>
                  )}
                </>
              )}
              <li className="nav-item dropdown ">
                <div
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  id="navbarDropdown"
                  role="button"
                  onMouseUp={() => changeState()}
                >
                  <img src={bellIcon} alt="" width="40px" className="bell" />
                  {visto || <div className="nueva-notificacion"></div>}
                </div>
                <div
                  className="dropdown-menu p-3"
                  aria-labelledby="navbarDropdown"
                >
                  {notificacion.length > 0 && (
                    <Notificaciones info={notificacion} setVisto={setVisto} />
                  )}
                </div>
              </li>
              <li className="nav-item dropdown">
                <div
                  className="nav-link text-left"
                  id="navbarDropdown"
                  role="button"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  {!crearFotoDePerfil ? (
                    <>
                      <img alt="" src={blankImaage} width="70px" />
                      {crearFotoDePerfil || (
                        <div className="nueva-notificacion-perfil"></div>
                      )}
                    </>
                  ) : (
                    <img
                      alt=""
                      src={imageAsUrl.imgUrl}
                      className="imagen-perfil"
                    />
                  )}
                </div>
                <div
                  className="dropdown-menu p-3"
                  aria-labelledby="navbarDropdown"
                >
                  <button
                    className="nav-link"
                    onClick={() => {
                      handleLogOut();
                    }}
                  >
                    <h4 style={{ whiteSpace: "nowrap" }}>Cerrar Sesión</h4>
                  </button>
                  <hr></hr>
                  <a className="nav-link" href={`../../perfil/${nickname}`}>
                    <h4>Ver Perfíl</h4>
                  </a>
                  {/*crearFotoDePerfil || (
                    <>
                      <hr></hr>
                      <Link className="nav-link" to="/foto-perfil">
                        <h4>Ingresa una foto de perfil!</h4>
                      </Link>
                    </>
                  )*/} 
                </div>
              </li>
              <li className="nav-item space P-3"></li>
            </div>
          </ul>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
