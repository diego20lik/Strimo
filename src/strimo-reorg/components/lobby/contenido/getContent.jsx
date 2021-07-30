import React, { useState, useEffect } from "react";
import firebase from "../../../../utils/firebase";
function GetContent(coleccion) {
  const firebaseIni = firebase.firestore();
  const [documentos, setDocumentos] = useState([]);
  useEffect(() => {
    const unsubscriber = firebaseIni
      .collection(coleccion)
      //.limit(9)
      .onSnapshot((snapshot) => {
        let datos = [];
        snapshot.forEach((documento) => {
          datos.push({ id: documento.id, info: documento.data() });
        });
        setDocumentos(datos);
      });
    return unsubscriber;
  }, []);
  return documentos;
}

export default GetContent;
