import React, { useRef, useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import Mensajes from "./mensaje";
import { useAuth } from "../context/authContext";
function Chat({ infor, setDocu }) {
  const { currentUser } = useAuth();
  const [menu, setMenu] = useState([]);
  const mensajeRef = useRef();
  const scrollRef = useRef();
  const chatMensajes = firebase.firestore().collection("Chat");
  const toggler = (i) => {
    let bol = menu;
    bol[i] = !bol[i];
    setMenu([...bol]);
  };
  const handleMensaje = async (id) => {
    await chatMensajes.doc(id).collection("Mensajes").add({
      texto: mensajeRef.current.value,
      email: currentUser.email,
      nombre: currentUser.displayName,
      timeCreated: firebase.firestore.FieldValue.serverTimestamp(),
    });

    goToBottom();
    mensajeRef.current.value = "";
  };
  const goToBottom = () => {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const removeChat = (i) => {
    let bol = infor;
    bol.splice(i, 1);
    console.log(bol, infor, "xd");
    setDocu([...bol]);
  };
  //UseEffcet
  useEffect(() => {
    console.log(infor, "a");
    infor.map(() => {
      setMenu([...menu, true]);
    });
  }, [infor]);
  return (
    <>
      {infor.map((doc, i) => {
        console.log(doc.id, doc.artista);
        return (
          <>
            {menu[i] ? (
              <div className="chat chat-border">
                <div className="chat-header " onClick={() => toggler(i)}>
                  <h4>{doc.artista}</h4>
                </div>
                <div className="mensajes">
                  <Mensajes id={doc.id} goToBottom={goToBottom} />
                  <div className="bottom" ref={scrollRef}></div>
                </div>
                <div className="input">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleMensaje(doc.id);
                    }}
                  >
                    <input
                      type="text"
                      placeholder="Di algo a `Aca nombre` "
                      ref={mensajeRef}
                    />
                    <button
                      style={{ width: "10%", margin: "5px" }}
                      type="submit"
                      className="primario oyt"
                    >
                      Enviar
                    </button>
                  </form>
                </div>
              </div>
            ) : (
              <div
                className="chat-min chat-header chat-border"
                onClick={() => toggler(i)}
              >
                <h4>{doc.artista}</h4>
                <div
                  className="close-chat"
                  onClick={(e) => {
                    e.preventDefault();
                    removeChat(i);
                  }}
                >
                  X
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
}

export default Chat;
