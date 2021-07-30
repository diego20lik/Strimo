import React, { useContext } from "react";
// import firebase from '../../utils/firebase'
function Menu({ chats, toggler, openChat }) {
  return (
    <div className="chat-menu chat-border">
      <div
        className="chat-header"
        onClick={() => {
          toggler();
        }}
      >
        <h4>Tus Chats</h4>
      </div>
      {chats ? <Chat data={chats} openChat={openChat} /> : "chao"}
    </div>
  );
}
function Chat({ data, openChat }) {
  return data.map((doc) => {
    return (
      <div
        className="chat-option"
        key={doc.id}
        onClick={() => {
          openChat(doc);
        }}
      >
        <img src={doc.img} alt="" />
        <div className="chat-option-title">
          <h5>Chat {doc.artista}</h5>
        </div>
      </div>
    );
  });
}

export default Menu;
