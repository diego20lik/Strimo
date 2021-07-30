import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase.js";
import { useParams } from "react-router-dom";
import "./link.css";
function Link() {
  const [link, setLink] = useState("");
  const { id } = useParams();
  const pago = id;
  const createLink = async () => {
    const invitacionDoc = firebase.firestore().collection("Invitacion");
    const unsubscriber = await invitacionDoc
      .where("pago", "==", pago)
      .get()
      .then((snapshot) => {
        let match = "";
        snapshot.forEach((doc) => {
          match = doc.data();
        });
        if (match) {
          setLink(
            `http://${window.location.hostname}/confirmar/${match.tiempo}`
          );
        } else {
          setLink("Lo sentimos Link equivocado");
        }
      });
    return () => unsubscriber();
  };
  useEffect(() => {
    setTimeout(() => {
      createLink();
    }, 3000);
  }, []);
  return (
    <>
      <input
        type="text"
        className="link-invitacion"
        value={link}
        readOnly={true}
      />
    </>
  );
}

export default Link;
