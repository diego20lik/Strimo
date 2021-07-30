import React, { useState, useEffect } from "react";
import firebase from "../../../utils/firebase";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import "../../styles/chats.css";
function Chats() {
  const history = useHistory();
  const chats = firebase.firestore().collection("Chat");
  const conciertos = firebase.firestore().collection("Conciertos");
  const { currentUser } = useAuth();
  const [chat, setChat] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscriber = chats
      .where("integrantes", "array-contains", currentUser.email)
      .get()
      .then(async (data) => {
        const Chats = await Promise.all(
          data.docs.map(async (doc) => {
            let artista = "";
            await conciertos
              .doc(doc.data().concierto)
              .get()
              .then(async (snapshot) => {
                artista = snapshot.data().artista;
              });
            return { id: doc.id, artista: artista };
          })
        );
        setChat(Chats);
      });
    return unsubscriber;
  }, []);
  useEffect(() => {
    setLoading(false);
  }, [chat]);
  return (
    <>
      <div className="chat-menu-tlf degradado">
        {!loading &&
          chat.map((doc) => {
            return (
              <div className="chat-contenedor-tlf" key={doc.id}>
                <div className="chat-info-tlf">
                  <h1>Chat con {doc.artista}</h1>
                  <button
                    className="primario margenes-boton"
                    onClick={() => history.push(`/chat/${doc.id}`)}
                  >
                    Ir al chat
                  </button>
                  <h5>No te lo pierdas</h5>
                  <p>Entra ya!</p>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
}

export default Chats;
