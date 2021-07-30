import React, { useState, useEffect, useRef } from "react";
import firebase from "../../../utils/firebase";
import { useAuth } from "../context/authContext";
import qr from "../../images/qr-code-example.png";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import Err from "../popup/err";
import Message from "../popup/message";
import Loading from "../loading";
export default function Register({ img, moneda, tipo }) {
  const { id } = useParams();
  const history = useHistory();
  const ref = useRef(null);
  const [invitacion, setinvitacion] = useState(false);
  const wallet = "6vuw9DbaenYyMjuBDn8bkH3Ny23b4s6mPPLq4dbuxZPDm EVo4TM";
  const [precioListo, setPrecioListo] = useState("");
  const [precio, setPrecio] = useState();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const preciobtc = 0.0013;
  const precioeth = 0.00042;
  const tiempo = firebase.firestore.Timestamp.now().toMillis();
  const { currentUser } = useAuth();
  const comprobante = `${currentUser.uid}${tiempo}`;
  useEffect(() => {
    if (tipo === "VIP") {
      setPrecio(100);
    } else {
      setPrecio(20);
    }

    if (moneda === "btc") {
      setPrecioListo(`${preciobtc * precio} ${moneda.toUpperCase()}`);
    } else {
      setPrecioListo(`${precioeth * precio} ${moneda.toUpperCase()}`);
    }
    setTimeout(() => {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }, [moneda, precio]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const pago = firebase.firestore().collection("Pagos");
    const invitacionDoc = firebase.firestore().collection("Invitacion");
    const videos = firebase.firestore().collection("Videos");
    const notificaciones = firebase.firestore().collection("Notificaciones");
    pago
      .where("comprobante", "==", comprobante)
      .where("usuario", "==", currentUser.uid)
      .get()
      .then((snapshot) => {
        let match = "";
        snapshot.docs.map(async (doc) => {
          match = doc.data();
        });
        if (!match) {
          pago
            .add({
              comprobante: comprobante,
              video: id,
              tipo: tipo,
              precio: precioListo,
              usuario: firebase.firestore.FieldValue.arrayUnion(
                currentUser.uid
              ),
            })
            .then(async (docRef) => {
              /*if(tipo=="VIP"){
                await conciertos.doc(id).update({
                  entradasVip: firebase.firestore.FieldValue.increment(-1),
                });
              }*/
              if (invitacion) {
                await invitacionDoc.add({
                  concierto: id,
                  de: currentUser.email,
                  pago: docRef.id,
                  usuarioInvitado: "",
                  tiempo:
                    firebase.firestore.Timestamp.now().toMillis() +
                    1000 * 60 * 60 * 5,
                });
              }
              await notificaciones.add({
                info: `Solicitud de compra para concierto ${id}, ha sido procesada correctamente`,
                infoHeadLine: "Compra procesada",
                usuario: currentUser.uid,
                pago: docRef.id,
                visto: false,
                tiempo: firebase.firestore.Timestamp.now().toDate(),
              });
              if (invitacion) {
                history.push(`/invitacion/${docRef.id}`);
                return;
              }
              setMessage("Compra Confirmada");
              setTimeout(() => {
                history.goBack();
              }, 3000);
            })
            .catch(async (err) => {
              setErr(err.message);
              setLoading(false);
              await notificaciones.add({
                info: `Solicitud de compra para concierto ${id}, ha devuelto un error :/`,
                infoHeadLine: "Error para procesar compra",
                usuario: currentUser.uid,
                visto: false,
              });
            });
        } else {
          if (invitacion) {
            history.push(`/invitacion/${comprobante}`);
            return;
          }
          setMessage("Compra Confirmada");
          setTimeout(() => {
            history.goBack();
          }, 3000);
        }
      });
    e.preventDefault();
  };
  return (
    <div className="form-pago">
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <img alt="" src={img} width="100px"></img>
      <h3 className="title">Payment Form</h3>
      <form onSubmit={handleSubmit} className="form-layout">
        <img alt="" src={qr} width="250px"></img>
        <input type="text" value={wallet} readOnly={true} />
        <div className="d-flex flex-column w-100 my-3 justify-content-center align-items-center">
          <input
            type="checkbox"
            name="invitar"
            onChange={() => {
              setinvitacion(!invitacion);
            }}
          />
          <label for="invitar">
            <h3>Invite a friend</h3>
          </label>
        </div>
        <Precio precio={precioListo} />
        <button
          type="Submit"
          className="primario"
          style={{ width: "30%" }}
          ref={ref}
        >
          Submit
        </button>
      </form>
    </div>
  );
}
const Precio = ({ precio }) => {
  return (
    <div className="precio">
      <h4>Precio: </h4>
      <h2>{precio}</h2>
    </div>
  );
};
