import React, { useState, useEffect, useRef } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
function Chat() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const addToChat = firebase.firestore().collection("Chat").where("video", "==", id);
  const mensajeRef = useRef();
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  const [chat, setChat] = useState([{}]);
  useEffect(() => {
    const unsubscribe = addToChat.onSnapshot((snap) => {
      snap.docs.map(doc=>{
        if (
          !doc.data() ||
          !doc.data().integrantes.find((email) => email === currentUser.email)
        ) {
        
        } else {
          
          doc.ref
            .collection("Mensajes")
            .orderBy("timeCreated")
            .limitToLast(25)
            .onSnapshot((snapshot) => {
              let mensajes = [];
              snapshot.forEach((data) => {
                mensajes.push({ id: data.id, mensaje: data.data() });
              });
              setChat(mensajes);
              setLoading(false);
              // goToBottom();
            });
        }
      })
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (!loading) {
      goToBottom();
    }
  }, [chat]);
  const goToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleMensaje = async (e) => {
  e.preventDefault();
  addToChat.onSnapshot(snap=>{
    snap.docs.map(doc=>{
        doc.ref.collection("Mensajes").add({
        texto: mensajeRef.current.value,
        email: currentUser.email,
        nombre: currentUser.displayName,
        timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
      }).then(()=>{
        goToBottom();
        mensajeRef.current.value = "";
      })
    })
  })
}
  return (
    <>
      {loading || (
        <div className="chat-tlf">
          <div className="mensajes-tlf">
            {chat.map((data) => {
              // return <p>{JSON.stringify(mensaje.texto)}</p>;
              return (
                <div key={data.id}>
                  {data.mensaje.email !== currentUser.email ? (
                    <MensajeRecibido mensaje={data} />
                  ) : (
                    <MensajeEnviado mensaje={data} />
                  )}
                </div>
              );
            })}
            <div ref={scrollRef}></div>
          </div>
          <div className="input-tlf">
            <form onSubmit={handleMensaje}>
              <input
                type="text"
                placeholder="Di algo a `Aca nombre` "
                ref={mensajeRef}
              />
              <button
                style={{ width: "10%", margin: "5px" }}
                type="submit"
                className="primario"
              >
                Enviar
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
const MensajeEnviado = ({ mensaje }) => {
  return (
    <div className="derecha">
      <div className="mensajeE-tlf">
        <div className="nombreE">{mensaje.mensaje.nombre}</div>
        <div className="textoE">{mensaje.mensaje.texto}</div>
      </div>
    </div>
  );
};
const MensajeRecibido = ({ mensaje }) => {
  return (
    <div className="mensaje-tlf">
      <div className="nombre">{mensaje.mensaje.nombre}</div>
      <div className="texto">{mensaje.mensaje.texto}</div>
    </div>
  );
};

export default Chat;
