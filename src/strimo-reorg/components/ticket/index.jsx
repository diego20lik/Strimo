import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import firebase from "../../../utils/firebase";
import { useParams } from "react-router-dom";
import logo from "../../images/strimo logo.png";
import logoFace from "../../images/facebook-circle.png";
import logoTwitter from "../../images/twitter-circle.png";
import logoInstagram from "../../images/instagram-circle.png";
import logoYoutube from "../../images/youtube-circle.png";
import "../../styles/ticket.css";
function Index() {
  const { id } = useParams();
  const [pago, setPago] = useState();
  const [concierto, setConcierto] = useState();
  const pagoDoc = firebase.firestore().collection("Pagos");
  const conciertoDoc = firebase.firestore().collection("Conciertos");
  useEffect(() => {
    const unsubscriber = pagoDoc
      .doc(id)
      .get()
      .then((snap) => {
        setPago(snap.data());
        conciertoDoc
          .doc(snap.data().concierto)
          .get()
          .then((doc) => {
            setConcierto(doc.data());
          });
      });
    return unsubscriber;
  }, []);
  return (
    <div className="degradado p-5">
      <div className="caja-blanca-2 fondo-blanco">
        <div className="ticket">
          <div className="p-3">
            <img src={logo} alt="" width="300px" />
            <div className="m-3">
              <p className="text-center">El id de tu ticket es: {id}</p>
              <hr />
              {concierto && (
                <>
                  <div className="d-flex my-1 w-100">
                    <h5>Concierto:</h5>
                    <h5 className="ml-auto">{concierto.titulo}</h5>
                  </div>
                  <div className="d-flex my-1 w-100">
                    <h5>Fecha:</h5>
                    <h5 className="ml-auto">{concierto.fecha}</h5>
                  </div>
                  <div className="d-flex my-1 w-100">
                    <h5>Hora:</h5>
                    <h5 className="ml-auto">{concierto.hora}</h5>
                  </div>
                  <div className="d-flex my-1 w-100">
                    <h5>Tipo de Ticket:</h5>
                    <h5 className="ml-auto">{pago.tipo}</h5>
                  </div>
                  <div className="d-flex my-1 w-100">
                    <h5>Precio:</h5>
                    <h5 className="ml-auto">{pago.precio}</h5>
                  </div>
                  <div className="d-flex my-1 w-100">
                    <h5>Artista:</h5>
                    <h5 className="ml-auto">{concierto.artista}</h5>
                  </div>
                </>
              )}
              {/* <p>De: {concierto.artista}</p>
          <p>Comienza: {concierto.fecha}</p> */}
            </div>
          </div>
          {/*<div className="fondo-redes-sociales d-flex justify-content-center">
          <img className="mx-2" width="40px" src={logoFace} alt=""/>
          <img className="mx-2" width="40px" src={logoTwitter} alt=""/>
          <img className="mx-2" width="40px" src={logoInstagram} alt=""/>
          <img className="mx-2" width="40px" src={logoYoutube} alt=""/>
        </div>*/}
        </div>
      </div>
    </div>
  );
}

export default Index;
