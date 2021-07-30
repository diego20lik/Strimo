import React, { useState } from "react";
import "./pago.css";
import eth from "../images/eth.png";
import btc from "../images/btc.png";
import visa from "../images/visa.png";
import mastercard from "../images/mastercard.png";
import Formulario from "./formulario";
function Index() {
  const [formulario, setFormulario] = useState(false);
  const [moneda, setMoneda] = useState("");
  const [img, setImg] = useState("");
  const [tipo, setTipo] = useState();
  const handleClick = (imagen, valor) => {
    if(!tipo){
      alert('Escoje un tipo de entrada')
      return
    }
    setFormulario(true);
    setImg(imagen);
    setMoneda(valor);
  };
  return (
    <>
      <div className="fondo">
        <div className="container">
          <h1 className="titulo-importante">Elige tu tipo de entrada:</h1>
      <div className='caja-blanca-2 fondo-blanco'>
            <div className='d-flex justify-content-evenly align-items-center'>
                 <div className="radio-button-element d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="usuario"
                name="rol"
                onClick={() => {
                  setTipo("VIP");
                }}
              />
              <label className="mb-0 ml-1 azul"><h2>VIP</h2></label>
            </div>
            <div className="radio-button-element d-flex justify-content-center align-items-center">
              <input
                type="radio"
                value="creador"
                name="rol"
                onClick={() => {
                  setTipo("estandar");
                }}
              />
              <label className="mb-0 ml-1"><h3>Estándar</h3></label>
            </div>
            </div>
        </div>
          <h1 className="titulo-importante">Método de pago:</h1>
          <div className="row centered">
            <div className="col seccion-mitad">
              <div className="caja-blanca">
                <h1>Cripto Monedas</h1>
                <div className="seccion">
                  <div
                    className="boton-pago"
                    onClick={() => handleClick(eth, "eth")}
                  >
                    <img src={eth} alt="" />
                    <h4>Ethereum</h4>
                  </div>
                  <div
                    className="boton-pago"
                    onClick={() => handleClick(btc, "btc")}
                  >
                    <img src={btc} alt="" />
                    <h4>Bitcoin</h4>
                  </div>
                </div>
              </div>
            </div>
            <div className="col seccion-mitad">
              <div className="caja-blanca">
                <h1>TDD y TDC</h1>
                <div className="seccion">
                  <div className="boton-pago">
                    <img src={visa} alt="" />
                  </div>
                  <div className="boton-pago">
                    <img src={mastercard} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {formulario && <Formulario img={img} moneda={moneda} tipo={tipo} />}
    </>
  );
}

export default Index;
