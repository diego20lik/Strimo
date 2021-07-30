import React, { useState, useRef, useEffect } from "react";
import firebase from "../../../utils/firebase";
import { useHistory } from "react-router-dom";
import Err from "../popup/err";
import Message from "../popup/message";
import Loading from "../loading";
function CambiarRole() {
  const [rol, setRol] = useState("");
  const emailRef = useRef();
  const [precio, setPrecio] = useState();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const rolDocument = firebase.firestore().collection("Roles");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (rol === "") return alert("Seleccione un Rol");
    rolDocument
      .where("user", "==", emailRef.current.value)
      .get()
      .then((value) => {
        if (value.empty) {
          setLoading(false);
          setErr("No existe tal usuario");
        }
        value.forEach((snap) => {
          snap.ref
            .update({
              ...snap.data(),
              role: rol,
            })
            .then(() => {
              setMessage("Proceso completado");
              setTimeout(() => history.goBack(), 3000);
            })
            .catch((e) => {
              setLoading(false);
              setErr("Alfo salio mal " + e.message);
            });
        });
      })
      .catch((e) => {
        setLoading(false);
        setErr("Alfo salio mal " + e.message);
      });
  };
  useEffect(() => {}, []);
  return (
    <>
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <div className="degradado fondo">
        <form className="form-perfil" onSubmit={handleSubmit}>
          <h1 className="text-center">
            Coloca el correo del perfil al cual le quieres cambiar el Rol
          </h1>
          <div className=" my-5 w-100">
            <input
              className="image-input w-100"
              type="email"
              ref={emailRef}
              placeholder="Email"
              required
            />
          </div>
          <div className="d-flex w-100 justify-content-evenly mb-2">
            <div className="radio-button-element d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="usuario"
                name="rol"
                onClick={() => {
                  setRol("usuario");
                }}
              />
              <label className="mb-0 ml-1">Usuario</label>
            </div>
            <div className="radio-button-element d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="creador"
                name="rol"
                onClick={() => {
                  setRol("creador");
                }}
              />
              <label className="mb-0 ml-1">Creador</label>
            </div>
            <div className="radio-button-element d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="admin"
                name="rol"
                onClick={() => {
                  setRol("admin");
                }}
              />
              <label className="mb-0 ml-1">Admin</label>
            </div>
          </div>
          <button className="primario">Cambiar Rol</button>
        </form>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
      </div>
    </>
  );
}

export default CambiarRole;
