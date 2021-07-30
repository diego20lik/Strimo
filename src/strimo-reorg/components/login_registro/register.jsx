import React, { useRef, useState } from "react";
import logo from "../../images/strimo__1_-removebg-preview_auto_x1.png";
import googleLogo from "../../images/googleLogo.png";
import { useAuth } from "../context/authContext";
import Err from "../popup/err";
import Loading from "../loading";
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
      setErr("Passwords Do not Match");
      return "Error";
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
      setErr(err.message);
      console.log(err);
    }
    setLoading(false);
  };
  return (
    <>
      {/* <img src={logo} width="100px" alt=""></img> */}
      {loading && <Loading />}
      {err && <Err message={err} setErr={setErr} />}
      <h1 className="title">Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="form-element text-center">
                <label htmlFor="email" className="text-center">
                  Choose your Username:
                </label>
                <input
                  required={true}
                  type="text"
                  placeholder="Username"
                  ref={nicknameRef}
                />
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="form-element email">
                <label htmlFor="email">Email: </label>
                <input
                  required={true}
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  ref={emailRef}
                />
              </div>
              <div className="form-element">
                <label htmlFor="name">Name: </label>
                <input
                  required={true}
                  type="text"
                  id="nombre"
                  name="nombre"
                  placeholder="Namw"
                  ref={nameRef}
                />
              </div>
            </div>
            <div className="col-sm-6 form-section">
              <div className="form-element">
                <label htmlFor="passowrd">Password: </label>
                <input
                  required={true}
                  type="password"
                  id="passowrd"
                  passowrd="passowrd"
                  placeholder="Password"
                  ref={passwordRef}
                />
              </div>
              <div className="form-element no-wrap">
                <label htmlFor="passowrd">Confirm Password: </label>
                <input
                  required={true}
                  type="password"
                  id="confirmPassowrd"
                  passowrd="passowrd"
                  placeholder="Confirm Password"
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
          Submit
        </button>
      </form>
      <div className="w-100 d-flex justify-content-center align-items-center">
        <div
          onClick={signUpWithGoogle}
          className="google-button d-flex p-2 mb-2"
        >
          <img src={googleLogo} alt="" width="30px" />{" "}
          <h6 className="m-0 ml-2"> Sign In With Google</h6>
        </div>
      </div>
    </>
  );
}
