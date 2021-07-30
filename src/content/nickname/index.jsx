import React, { useState, useRef, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import Err from "../popup/err";
import Message from "../popup/message";
import Loading from "../loading";
import { useAuth } from "../context/authContext";
function CambiarRole() {
  const { currentUser } = useAuth();
  const [rol, setRol] = useState("");
  const nombreUsuarioRef = useRef();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const usuarios = firebase.firestore().collection("Usuarios");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await usuarios
      .where("nickname", "==", nombreUsuarioRef.current.value)
      .get()
      .then((snap) => {
        if (snap.empty) {
          usuarios
            .where("user", "==", currentUser.email)
            .get()
            .then((snapshot) => {
              snapshot.docs.map((doc) => {
                doc.ref
                  .update({
                    nickname: nombreUsuarioRef.current.value,
                  })
                  .then(() => {
                    setLoading(false);
                    setMessage("Nombre de usuario actualizado");
                    setTimeout(() => {
                      history.push("/pre");
                    }, 2500);
                  });
              });
            })
            .catch((err) => {
              setErr(err.message);
            });
          return;
        }
        setLoading(false);
        setErr("Nombre de usuario reservado, escoja otro");
      })
      .catch((err) => {
        setErr(err.message);
      });
  };
  return (
    <>
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <div className="degradado fondo">
        <form className="form-perfil" onSubmit={handleSubmit}>
          <h1 className="text-center">Create New Username</h1>
          <div className=" my-5 d-flex justify-content-center align-items-center w-100">
            <input
              style={{ minWidth: "300px", textAlign: "center" }}
              type="text"
              ref={nombreUsuarioRef}
              placeholder="Username"
              required
            />
          </div>
          <button className="primario">Update Profile</button>
        </form>
      </div>
    </>
  );
}

export default CambiarRole;
