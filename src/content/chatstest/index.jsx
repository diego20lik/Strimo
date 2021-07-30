import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import Menu from "./menu";
import Chat from "./chat";
import "./chat.css";

function Index() {
  const { currentUser } = useAuth();
  const chats = firebase.firestore().collection("Chat");
  const conciertos = firebase.firestore().collection("Conciertos");
  const [chat, setChat] = useState([]);
  const [docu, setDocu] = useState([]);
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    const unsubscriber = chats
      .where("integrantes", "array-contains", currentUser.email)
      .get()
      .then(async (data) => {
        const Chats = await Promise.all(
          data.docs.map(async (doc) => {
            let de = "";
            let imagen = "";
            await conciertos
              .doc(doc.data().concierto)
              .get()
              .then(async (snapshot) => {
                de = snapshot.data().de;
                imagen = snapshot.data().img;
              });
            // await Promise.all(
            //   conciertos.doc(doc.data().concierto).onSnapshot((snap) => {
            //     de = snap.data().de;
            //     imagen = snap.data().img;
            //     console.log(de);
            //   })
            // );
            // console.log(de, "espera");
            return { id: doc.id, de: de, img: imagen };
          })
        );
        setChat(Chats);
      });
    return unsubscriber;
  }, []);
  const toggler = () => {
    setMenu(!menu);
  };
  const openChat = (doc) => {
    if (!docu.some((element) => element == doc) && docu.length < 3) {
      if (docu.length == 2) {
        let bol = docu;
        bol.splice(0, 1);
        bol.push(doc);
        setDocu([...bol]);
      } else {
        setDocu([...docu, doc]);
      }
    }
  };
  return (
    <div className="chat-bottom">
      <div className="chat-space">
        {docu.length > 0 && <Chat infor={docu} setDocu={setDocu} />}
      </div>
      <div className="chat-menu-space">
        {menu ? (
          <Menu chats={chat} toggler={toggler} openChat={openChat} />
        ) : (
          <div className="chat-button" onClick={() => toggler()}>
            <h4>Chats</h4>
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
