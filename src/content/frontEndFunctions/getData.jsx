import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import userEvent from "@testing-library/user-event";
function GetContent(coleccion) {
  const { id } = useParams();
  const firebaseIni = firebase.firestore();
  const [data, setData] = useState([]);
  useEffect(() => {
    // alert("A");
    const unsubscriber = firebaseIni
      .collection(coleccion)
      .doc(id)
      .onSnapshot(async (snap) => {
        let pfp = "";
        firebaseIni
          .collection("Usuarios")
          .where("nickname", "==", snap.data().de)
          .get()
          .then((doc) => {
            if (doc.empty) {
              setData({ element: snap.data() });
              return;
            }
            doc.docs.map(async (user) => {
              pfp = user.data().pfp;
              // await setData({ element: snap.data(), pfp: user.data().pfp });
              setData({ element: snap.data(), pfp: user.data().pfp });
            });
          });
      });
    return unsubscriber;
  }, []);
  return data;
}

export default GetContent;
