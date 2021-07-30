import React, { useState, useEffect } from "react";
import blockchainLogo from "../images/blockchainLogo.png";
import smartContractLogo from "../images/smartContractLogo.png";
import netflix from "../images/netflix.png";
import prime from "../images/prime.png";
import disney from "../images/disney.png";
import hbo from "../images/hbo.png";
import rarible from "../images/rarible.png";
import opensea from "../images/opensea.png";
import superchief from "../images/superchief.png";
import cryptoart from "../images/criptoart.png";
import columna from "../images/columnaGriega.png";
import usuarioGeneral from "../images/usuarioGeneral.png";
import usuarioFans from "../images/usuarioFans.png";
import monerador from "../images/monerador.png";
import administrador from "../images/administrador.png";
import rompeCabezas from "../images/rompeCabezas.png";
import backgorundFinance from "../images/backgorundFinance.png";
import PopUp from "../popup";
import CountDown from "../countdown-preventa";
import "./inicio.css";
function Index() {
  const [popUp, setPopUp] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setPopUp(true);
    }, 5000);
    return timer;
  }, []);
  return (
    <>
      {popUp && <PopUp tipo="landing" />}
      <div>
        <div className="container-fluid jumbotron-landing-page py-4">
          <div className="row">
            <div className="col-md-8 d-flex justify-content-center preventa">
              <h1 className="font-title blanco">PREVENTA</h1>
              <CountDown />
              <div className="fondo-oscuro d-flex w-100 mb-3 justify-content-center align-items-center flex-column">
                <a
                  target="_blank"
                  rel="noreferrer"
                  href="https://strimoplatform.medium.com/strimo-streaming-and-ntf-platformtoken-presale-359fb7a87eb1"
                >
                  <button className="primario m-0 text-center">
                    Ir a la preventa!{" "}
                  </button>
                </a>
              </div>
            </div>
            <div className="col-md-4 background-image-info"></div>
          </div>
        </div>
        <div className="container">
          <div
            className="row burbuja d-flex justify-content-center align-items-center  py-5 mt-3"
            id="inicio"
          >
            <div className="col-md-8 d-flex justify-content-center info-landing">
              <h1 className="font-title text-center ">¿QUÉ ES?</h1>
              <h5 className=" text-justify">
                Es una plataforma Web-Based y Móvil de entretenimiento en vivo y
                diferido, vía STREAMING. Esta plataforma permite la monetización
                de su contenido y acceso mediante su propio token “STRIMO TOKEN
                (ERC-20)” y “STRIMO GALERY (ERC-721)” , manteniendo la
                seguridad, privacidad, transparencia y confianza de la
                TECNOLOGIA BLOCKCHAIN.
              </h5>
            </div>
          </div>
          <h1 className="font-title  my-5" id="funcion">
            FUNCIÓN
          </h1>
          <div className="row d-flex my-5">
            <div className="col-md-4 mb-4 seccion-funciones-landing-page d-flex flex-column  align-items-center">
              <div className="caja-azul-claro d-flex justify-content-center align-items-center">
                <img src={blockchainLogo} alt="" width="150px" />
              </div>
              <h4 className="text-center">
                STRIMO está sustentado en la <b>BLOCKCHAIN</b> de{" "}
                <b>ETHEREUM</b>.
              </h4>
            </div>
            <div className="col-md-4 mb-4">
              <div className="flecha"></div>
            </div>
            <div className="col-md-4 mb-4 seccion-funciones-landing-page d-flex flex-column justify-content-center align-items-center">
              <div className="caja-azul-claro d-flex justify-content-center align-items-center">
                <img src={smartContractLogo} alt="" width="150px" />
              </div>
              <h4 className="text-center">
                Para ello, se ha creado un sofisticado SMART CONTRACT y un token
                ERC-20 de nombre STRIMO.
              </h4>
            </div>
          </div>
        </div>
        <div className="container-fluid degradado-2">
          <h1 className="font-title order-2 my-5">
            Plataforma de contenido en vivo y diferidos.
          </h1>
          <div className="row">
            <div className="col-md-6 order-1 laptop"></div>
            <div className="col-md-6 caja-blanca-2 fondo-blanco d-flex justify-content-center align-items-center">
              <h5>
                STRIMO ofrece paquetes de contenido totalmente originales para
                ser pagados en TOKEN STRIMO, ETHEREUM y TETHER . STRIMO posee su
                propia pasarela de PAGO y su TOKEN, permitiendo a sus usuarios
                crear su propia WALLET STRIMO una vez se registren en la
                plataforma.
              </h5>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-5 fondo-purpura">
          <h1 className="font-title blanco">
            ANTECEDENTES DE CONTENIDO DIGITAL
          </h1>
          <div className="row p-3 blanco">
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={netflix} alt="" />
              </div>
              <h2 className="text-center">Netflix</h2>
            </div>
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={prime} alt="" className="prime-img" />
              </div>
              <h2 className="text-center">Amazon Prime</h2>
            </div>
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={disney} alt="" className="" />
              </div>
              <h2 className="text-center">Disney +</h2>
            </div>
            <div className="col-md-12 d-flex justify-content-center items-align-center">
              <div className="col-md-4 my-5">
                <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                  <img src={hbo} alt="" />
                </div>
                <h2 className="text-center">HBO GO</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container-fluid pt-5 degradado-3">
          <h1 className="font-title blanco">ANTECEDENTES DE GALERIAS EN NFT</h1>
          <div className="row p-3 blanco">
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={rarible} alt="" />
              </div>
              <h2 className="text-center">Rarible</h2>
            </div>
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={opensea} alt="" className="prime-img" />
              </div>
              <h2 className="text-center">Open Sea</h2>
            </div>
            <div className="col-md-4 my-5">
              <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                <img src={superchief} alt="" />
              </div>
              <h2 className="text-center">Super Chief</h2>
            </div>
            <div className="col-md-12 d-flex justify-content-center items-align-center">
              <div className="col-md-4 my-5">
                <div className="col-md-12 d-flex justify-content-center items-align-center p-2">
                  <img src={cryptoart} alt="" />
                </div>
                <h2 className="text-center">Crypto Art</h2>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="caja-blanca-2 my-5">
            <h5 className="text-justify">
              STRIMO es una plataforma que presenta cabida a los Artistas,
              Productores, Casas Productoras, Disqueras, Cineastas, Creadores de
              Contenidos y Nuevos Talentos. Que les permiten monetizar su
              contenido original y ser conocidos, así como armar un nuevo
              publico. Mediante el TOKEN STRIMO (ERC-20), se hacen las
              transacciones transparentes y con la GALERIA STRIMO TOKEN ERC-721,
              ellos mismos pueden poner a la venta o subastar contenido
              diferido, Merchandising y piezas de artes originales, para que el
              usuario pueda disfrutar y adquirir una experiencia completa
              de los contenidos publicados.
            </h5>
          </div>
          <div className="row text-center">
            <div className="col-lg-3 col-sm-6 my-5">
              <div className="col-12 landing-page-planes  d-flex flex-column align-items-center caja-blanca-2">
                <h1 className="azul mb-4">
                  <b> PLAN LITE</b>
                </h1>
                <b>
                  Herramienta sencillas para configurar el apoyo recurrente de
                  sus fans.
                </b>
                <h2 className="rojo mt-4">2%</h2>
                <p>De los ingresos mensuales de su STRIMO.</p>
                <div className="to-bottom">
                  <h2 className="mt-4">20K</h2>
                  <h2>VISTAS</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-5">
              <div className="col-12 landing-page-planes d-flex flex-column align-items-center caja-blanca-2">
                <h1 className="azul">
                  <b> PLAN PRO</b>
                </h1>
                <b>
                  Todo lo que necesitas para construir un negocio de membresía
                  próspero que proporcione ingresos significativos .
                </b>
                <h2 className="rojo mt-4">4%</h2>
                <p>De los ingresos mensuales de su STRIMO.</p>
                <div className="to-bottom">
                  <h2 className="mt-4">80K</h2>
                  <h2>VISTAS</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-5">
              <div className="col-12 landing-page-planes d-flex flex-column align-items-center caja-blanca-2">
                <h1 className="azul">
                  <b> PLAN PREMIUM</b>
                </h1>
                <b>
                  Privilegio de la página a los fans, interacción con los
                  artistas, tiempo ilimitado, acceso a la Galería NFT.
                </b>
                <h2 className="rojo mt-4">8%</h2>
                <p>De los ingresos mensuales de su STRIMO.</p>
                <div className="to-bottom">
                  <h2 className="mt-4">200K</h2>
                  <h2>VISTAS</h2>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 my-5">
              <div className="col-12 landing-page-planes d-flex flex-column align-items-center caja-blanca-2">
                <h1 className="azul">
                  <b> PLAN VIP</b>
                </h1>
                <b>
                  Coaching y apoyo dedicados a artistas y empresas, mayor
                  cantidad de vistas y recompensas a sus fans, interacción con
                  los artistas, acceso a la Galería NFT.
                </b>
                <h2 className="rojo mt-4">1%</h2>
                <p>De los ingresos mensuales de su STRIMO.</p>
                <div className="to-bottom">
                  <h2 className="mt-4">500K</h2>
                  <h2>VISTAS</h2>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 d-flex align-items-center justify-content-center">
            <div className="caja-3 my-3 blanco  col-md-6 d-flex align-items-center justify-content-center flex-column">
              <div className="circle-border d-flex mb-3 align-items-center justify-content-center flex-column">
                <img src={columna} alt="" />
                <h4 className="mt-1 nowrap blanco  azul">Galeria NFT</h4>
              </div>
              <p className="text-justify">
                La plataforma cuenta con un sector de GALERIA DE CONTENIDO,
                dividido en dos secciones VENTA Y SUBASTA DE CONTENIDO DIGITAL.
                Que permite a los usuarios disfrutar y adquirir el
                contenido original.
              </p>
            </div>
          </div>
          <div className="row text-center">
            <h1 className="text-center my-5">
              La plataforma STRIMO, cuenta con CUATRO ROLES fundamentales.
            </h1>
            <div className="my-3 blanco col-md-6">
              <div className="caja-3 landing-page-planes col-12 d-flex align-items-center justify-content-center flex-column">
                <img src={usuarioGeneral} width="200px" alt="" />
                <h1 className="mt-3">Usuario General</h1>
                <p className="text-justify mt-3">Compradores del contenido.</p>
              </div>
            </div>
            <div className="my-3 blanco col-md-6">
              <div className="caja-3 landing-page-planes col-12 d-flex align-items-center justify-content-center flex-column">
                <img src={usuarioFans} width="200px" alt="" />
                <h1 className="mt-3">Usuario Fans</h1>
                <p className="text-justify mt-3">
                  Es el usuario, que a demás de disfrutar del contenido
                  exclusivo tiene acceso a la galería NFT.
                </p>
              </div>
            </div>
            <div className="my-3 blanco col-md-6">
              <div className="caja-3 landing-page-planes col-12 d-flex align-items-center justify-content-center flex-column">
                <img src={monerador} width="200px" alt="" />
                <h1 className="mt-3">Usuario Moderador</h1>
                <p className="text-justify mt-3">
                  Este usuario es el creador de contenido, que establece la zona
                  horaria de difusión haciendose responsable de los derechos de
                  autor.
                </p>
              </div>
            </div>
            <div className="my-3 blanco col-md-6">
              <div className="caja-3 landing-page-planes col-12 d-flex align-items-center justify-content-center flex-column">
                <img src={administrador} width="200px" alt="" />
                <h1 className="mt-3">Usuario Administrador</h1>
                <p className="text-justify mt-3">
                  Exclusivo para la administración y mantenimiento de la
                  plataforma.
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="col-12 mt-5 d-flex align-items-center justify-content-center">
            <div className="caja-3 my-3 blanco  col-md-6 d-flex align-items-center justify-content-center flex-column">
              <img src={rompeCabezas} alt="" width="200px" />

              <p className="text-justify mt-1">
                Los participantes Hodlers pueden ser moderadores de los
                contenidos STRIMO, es decir que tienen cierta participación en
                los eventos y programas que se realicen en la plataforma.
                Mientras mayor cantidad de TOKEN STRIMO tengan, mayor
                privilegios y participación tendrán.
              </p>
            </div>
          </div>
          <h1 className="font-title my-5">TOKEN</h1>
          <div className="col-12 row d-flex my-5 align-items-center justify-content-center">
            <div className="col-md-6">
              <p>
                El TOKEN DE STRIMO, está diseñado como incentivo para hodlers,
                comerciantes y traders. El cual estará enlistado en el Exchange,
                y será usado como método de ahorro.
              </p>
              <p>
                El TOKEN DE STRIMO ERC-20 tiene su correlativo en BINANCE SMART
                CHAIN (BSC), y posee un BRIDGE entre BLOCKCHAIN ETHEREUM y el
                CHAIN de BINANCE.
              </p>
            </div>
            <div className="col-md-6 text-center">
              <img src={backgorundFinance} alt="" height="300px" />
            </div>
          </div>
        </div>
      </div>
      <div className="newsteller container" id="newsteller">
        <h1 className="font-title">Newsteller</h1>
        <div className="row d-flex justify-content-center align-items-center">
          {/* <div className="col-md-6"></div> */}
          <div className="col-md-6 form my-5">
            <h1>Subscribete a nuestro Newsteller!</h1>
            <form>
              <div className="form-element">
                <label htmlFor="name">Email: </label>
                <input
                  className="login"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Email"
                  // ref={emailRef}
                />
              </div>
              <div className="form-element">
                <label htmlFor="passowrd">Nombre: </label>
                <input
                  className="login"
                  type="text"
                  id="nombre"
                  // passowrd="passowrd"
                  placeholder="Nombre"
                  // ref={}
                />
              </div>

              <button
                style={{ width: "50%" }}
                // disable={}
                type="Submit"
                className="primario margenes-boton"
              >
                Entrar
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="footer">
        <p>Desarrolado por Improtecnologia</p>
      </div>
    </>
  );
}

export default Index;
