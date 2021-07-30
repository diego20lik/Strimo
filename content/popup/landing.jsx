import React, { useState, useEffect } from "react";
import "./landing.css";
import CountDown from "../countdown-preventa";
import fileSaver from "file-saver";
function Landing() {
  function handlePDF() {
    fileSaver.saveAs(process.env.PUBLIC_URL + "/PDF/STRIMO.pdf", "STRIMO.pdf");
  }
  return (
    <div className="w-100 h-100 p-4 degradado-4 laptop-background d-flex justify-content-center align-items-center flex-column">
      <h1 className="blanco font-title my-4">Próxima Preventa En:</h1>
      <CountDown />
      <div className="row">
        <div className=" d-flex col-md-6 mb-3 justify-content-center align-items-center flex-column">
          <div className="fondo-oscuro col-12 d-flex justify-content-center align-items-center flex-column">
            <h1 className="blanco font-title">Enterate de más acá:</h1>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://strimoplatform.medium.com/strimo-streaming-and-ntf-platformtoken-presale-359fb7a87eb1"
            >
              <button className="primario text-center">Ver más</button>
            </a>
          </div>
        </div>
        <div className=" d-flex mb-3 col-md-6 justify-content-center align-items-center flex-column">
          <div className="fondo-oscuro col-12 d-flex justify-content-center align-items-center flex-column">
            <h1 className="blanco font-title">Descargar White Paper:</h1>

            <button
              className="primario text-center"
              onClick={() => {
                handlePDF();
              }}
            >
              Descargar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
