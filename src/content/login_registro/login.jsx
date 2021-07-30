import React, { useState, useRef } from "react";
import { useAuth } from "../context/authContext";
import googleLogo from "../images/googleLogo.png";
import Err from "../popup/err";
import Loading from "../loading";
export default function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);
  const { logIn, signUpWithGoogle } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await logIn(emailRef.current.value, passwordRef.current.value);
      setLoading(false);
    } catch (err) {
      setErr(err.message);
      setLoading(false);
    }
  };
  return (
    <>
      {err && <Err message={err} setErr={setErr} />}
      {loading && <Loading />}
      {/* <img src={logo} width="100px" alt="logo"></img> */}
      <h1 className="title">Log In</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="name">Email: </label>
          <input
            className="login"
            type="email"
            required
            placeholder="Email"
            ref={emailRef}
          />
        </div>
        <div className="form-element ">
          <label htmlFor="passowrd">Password: </label>
          <input
            className="login"
            type="password"
            id="passowrd"
            passowrd="passowrd"
            placeholder="Password"
            ref={passwordRef}
          />
        </div>
        <button
          style={{ width: "70%" }}
          disable={loading}
          type="Submit"
          className="primario margenes-boton"
        >
          Submit
        </button>
      </form>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div
          onClick={signUpWithGoogle}
          className="google-button d-flex p-2 mb-2"
        >
          <img src={googleLogo} alt="" width="30px" />{" "}
          <h6 className="m-0 ml-2"> Log In With Google</h6>
        </div>
      </div>
    </>
  );
}
