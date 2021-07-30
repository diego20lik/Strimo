import React, { useRef, useState } from "react";
import logo from "../images/strimo__1_-removebg-preview_auto_x1.png";
import googleLogo from "../images/googleLogo.png";
import { useAuth } from "../context/authContext";
import Err from "../popup/err"
import Loading from "../loading"
export default function Register() {
  const [err, setErr] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const nameRef = useRef();
  const nicknameRef = useRef();
  const [loading, setLoading] = useState(false);
  const { signUp, signUpWithGoogle } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      alert("Contrasenas no coinciden");
      return "errormanure";
    }
    try {
      setLoading(true);
      await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        nameRef.current.value,
        nicknameRef.current.value 
      );
    } catch (err) {
      setErr(err.message)
      console.log(err)
    }
    setLoading(false);
  };
  return (
    <>
      {/* <img src={logo} width="100px" alt=""></img> */}
      {loading&&<Loading/>}
      {err&&<Err message={err} setErr={setErr}/>}
      <h1 className="title">Registro</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-element text-center">
              <label htmlFor="email" className="text-center">Coloca tu nombre de usuario: </label>
                <input
                  required={true}
                  type="text"
                  placeholder="Nombre de Usuario"
                  ref={nicknameRef}
                />
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="form-element email">
                <label htmlFor="email">Correo Electrónico: </label>
                <input
                  required={true}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo Electrónico"
                  ref={emailRef}
                />
              </div>
              <div className="form-element">
                <label htmlFor="name">Nombre: </label>
                <input
                  required={true}
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Nombre"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="form-element">
                <label htmlFor="passowrd">Contraseña: </label>
                <input
                  required={true}
                  type="password"
                  id="passowrd"
                  passowrd="passowrd"
                  placeholder="Contraseña"
                  ref={passwordRef}
                />
              </div>
              <div className="form-element no-wrap">
                <label htmlFor="passowrd">Confirme Contraseña: </label>
                <input
                  required={true}
                  type="password"
                  id="confirmPassowrd"
                  passowrd="passowrd"
                  placeholder="Contraseña"
                  ref={confirmPasswordRef}
                />
              </div>
            </div>
          </div>
        </div>
        <button
          style={{ width: "50%" }}
          //disabled={loading}
          type="Submit"
          className="primario margenes-boton"
        >
          Entrar
        </button>
      </form>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div
          onClick={signUpWithGoogle}
          className="google-button d-flex p-2 mb-2"
        >
          <img src={googleLogo} alt="" width="30px" />{" "}
          <h6 className="m-0 ml-2"> Accede con Google</h6>
        </div>
      </div>
    </>
  );
}

