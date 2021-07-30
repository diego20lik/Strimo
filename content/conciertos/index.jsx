import React, { useState, useEffect, useRef } from "react";
import Firebase from "../../utils/firebase";
import ConciertosRow from "../conciertos-row";
import {InstantSearch, SearchBox, Hits} from "react-instantsearch/dom"
import "./conciertos.css";
function Index() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const ref = useRef();
  const conciertos = Firebase.firestore().collection("Videos");
  useEffect(() => {
    const unsubsciber = conciertos
    //.where("estatus", "==", "aprobado")
      //.orderBy("envivo", "desc")
      .onSnapshot((snapshot) => {
        let Conciertos = [];
        snapshot.docs.map((doc) => {
          Conciertos.push({ info: doc.data(), id: doc.id });
        });
        setData(Conciertos);
      });
    return unsubsciber;
  }, [loading]);
  useEffect(() => {
    setLoading(false);
  }, [conciertos]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    conciertos
      .orderBy("nombreBasico")
      .startAt(ref.current.value)
      .endAt(ref.current.value.toLowerCase().replace(/\W/g, "") + "\uf8ff")
      .get()
      .then((doc) => {
        let Conciertos = [];
        doc.forEach((datos) => {
          if (
            ref.current.value.toLowerCase().replace(/\W/g, "") ===
            datos.data().nombreBasico
          ) {
            Conciertos.push({ info: datos.data(), id: datos.id });
          }
        });
        if (Conciertos.length < 1) {
          if (data.length < 8) {
            setLoading(true);
          }
        } else {
          setData(Conciertos);
        }
      });
  };
  return (
    <div className="degradado">
      {/*<InstantSearch 
        apiKey="fba788c80c3c6414dbbdfc921122c406"
        appId="ZCGTYSNYAK"
        indexName="Videos"
      >
        <SearchBox translations={{placeholder: "Busca Videos que quieres ver"}}/>
      </InstantSearch>*/}
      <div className="conciertos">
        <form className="busqueda" onSubmit={handleSubmit}>
          <input type="text" placeholder="Buscar Artista" ref={ref} />
          <button
            className="primario"
            type="submit"
            style={{
              marginLeft: "10px",
              width: "10%",
              minWidth: "fit-content",
            }}
          >
            Buscar
          </button>
        </form>
        {loading || <ConciertosRow data={data} />}
      </div>
    </div>
  );
}

export default Index;
