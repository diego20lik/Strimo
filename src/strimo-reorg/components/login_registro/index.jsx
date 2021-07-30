import React, { useState } from "react";
import LoginForm from "./login";
import RegisterForm from "./register";
import logo from "../../images/strimo logo.png";
import "../../styles/login-registro.css";
function PreLogin() {
  const [form, setForm] = useState(false);
  const [string, setsString] = useState("You already have an account? Log In");
  const handleChange = () => {
    setForm(!form);
    if (string === "You don't have an account? Sign In") {
      setsString("You already have an account? Log In");
    } else {
      setsString("You don't have an account? Sign In");
    }
  };
  return (
    <>
      <div className="fondo-finance">
        <div className="container">
          <div className="row centered">
            <div className="col left-side">
              <h1>
                <b>Enjoy the Best live transmissions!</b>
              </h1>
              <br></br>
              <h1>
                <b>Gain Access to VIP content!</b>
              </h1>
            </div>
            <div className="col right-side">
              <div className="form">
                {form ? <LoginForm /> : <RegisterForm />}
                <p>
                  {string}{" "}
                  <b onClick={handleChange} className="toggle">
                    Here!
                  </b>
                </p>
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
