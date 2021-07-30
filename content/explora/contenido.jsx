import React, { useState, useEffect } from "react";
import ConciertosRow from "../conciertos-row";
import Firebase from "../../utils/firebase";
function Contenido() {
  const Videos = Firebase.firestore().collection("Videos");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setData([]);
    const unsubscriber = getInfo(true, "¡En Vivo Ahora!");
    return unsubscriber;
  }, []);
  useEffect(() => {
    const unsubscriber = getInfo(false, "Videos que quizás te perdiste: ");
    return unsubscriber;
  }, []);
  useEffect(() => {
    if (data.length > 0) {
      setLoading(false);
    }
  }, [data]);
  const getInfo = async (bol, titulo) => {
    const promise = await Videos
      .where("NSFW", "==", false)
      .limit(3)
      .get()
      .then((doc) => {
        let contenedor = [];
        doc.docs.map((datos) => {
          contenedor.push({ info: datos.data(), id: datos.id });
        });
        return contenedor;
      });
    const promesa = await Promise.all(promise);
    setData((data) => [...data, { info: promesa, titulo: titulo }]);
  };
  return (
    <>
      {loading ||
        data.map((doc) => {
          return (
            <div key={doc.titulo}>
              <h1 className="titulo-seccion">{doc.titulo}</h1>
              <ConciertosRow data={doc.info} />
            </div>
          );
        })}
    </>
  );
}
export default Contenido;
