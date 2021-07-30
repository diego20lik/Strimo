import React, { useState } from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import logo from "../images/strimo logo.png";
import "./style.css";
function PreLogin() {
  const [form, setForm] = useState(false);
  const [string, setsString] = useState("¿Ya estás registrado? Ingresa");
  const handleChange = () => {
    setForm(!form);
    if (string === "¿No estás registrado aún? Registrate") {
      setsString("¿Ya estás registrado? Ingresa");
    } else {
      setsString("¿No estás registrado aún? Registrate");
    }
  };
  return (
    <>
      <div className="fondo">
        <div className="container">
          <div className="row centered">
            <div className="col left-side">
              <h1>Disfruta de las mejores transmisiones en VIVO.</h1>
              <br></br>
              <h1>Ten acceso a contenido VIP.</h1>
            </div>
            <div className="col right-side">
              <div className="form">
                {form ? <LoginForm /> : <RegisterForm />}
                <p>{string} <b onClick={handleChange} className="toggle">Acá</b></p>
                {/*<button
                  onClick={handleChange}
                  className="secundario"
                  style={{ width: "40%" }}
                >
                  {string}
                </button>*/}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PreLogin;
