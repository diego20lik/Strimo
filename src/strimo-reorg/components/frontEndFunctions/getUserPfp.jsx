import React, { useState, useEffect } from "react";
import firebase from "../../../utils/firebase";
// import { useParams } from "react-router-dom";
function GetContent(user) {
  //   const { id } = useParams();
  const firebaseIni = firebase.firestore();
  const [data, setData] = useState();
  useEffect(() => {
    const unsubscriber = firebaseIni
      .collection("Usuarios")
      .where("nickname", "==", user)
      .get()
      .then((data) => {
        data.docs.map((doc) => {
          setData(doc.data().pfp);
        });
      });
    return unsubscriber;
  }, []);
  return data;
}

export default GetContent;
