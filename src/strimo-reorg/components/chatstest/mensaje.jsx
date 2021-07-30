import React, { useState, useEffect, useRef } from "react";
import firebase from "../../../utils/firebase";
import { useAuth } from "../context/authContext";
function Mensajes({ id, goToBottom }) {
  const { currentUser } = useAuth();
  const chatMensajes = firebase.firestore().collection("Chat");
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscriber = chatMensajes
      .doc(id)
      .collection("Mensajes")
      .orderBy("timeCreated")
      .limitToLast(25)
      .onSnapshot((snapshot) => {
        let mensajes = [];
        snapshot.forEach((data) => {
          mensajes.push({ id: data.id, mensaje: data.data() });
        });
        setChat(mensajes);
        console.log("hm");
        setLoading(false);
      });
    return unsubscriber;
  }, [id]);
  useEffect(() => {
    goToBottom();
  }, [chat]);
  return (
    <>
      {chat.map((doc) => {
        return (
          <div key={doc.id}>
            {doc.mensaje.email !== currentUser.email ? (
              <MensajeRecibido mensaje={doc} />
            ) : (
              <MensajeEnviado mensaje={doc} />
            )}
          </div>
        );
      })}
    </>
  );
}
const MensajeEnviado = ({ mensaje }) => {
  return (
    <div className="derecha">
      <div className="mensajeE">
        <div className="nombreE">{mensaje.mensaje.nombre}</div>
        <div className="textoE">{mensaje.mensaje.texto}</div>
      </div>
    </div>
  );
};
const MensajeRecibido = ({ mensaje }) => {
  return (
    <div className="mensaje">
      <div className="nombre">{mensaje.mensaje.nombre}</div>
      <div className="texto">{mensaje.mensaje.texto}</div>
    </div>
  );
};
export default Mensajes;
