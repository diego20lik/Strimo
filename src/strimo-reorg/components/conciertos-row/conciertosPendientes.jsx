import React, { useState, useReducer } from "react";
import "../../styles/conciertos-row.css";
import PopUp from "../popup";
import firebase from "../../../utils/firebase";
function ConciertosPendientes({ data }) {
  const [dataPopUp, setDataPopUp] = useState();
  const popUp = (data) => {
    setDataPopUp(data);
  };
  const handleAprobar = (id) => {
    firebase
      .firestore()
      .collection("Conciertos")
      .doc(id)
      .update({
        estatus: "aprobado",
      })
      .then(() => {
        alert("Concierto Aprobado");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  const handleDenegar = (id) => {
    firebase
      .firestore()
      .collection("Conciertos")
      .doc(id)
      .update({
        estatus: "denegado",
      })
      .then(() => {
        alert("Concierto Denegado");
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  return (
    <>
      {dataPopUp && <PopUp data={dataPopUp} tipo="concierto-muestra" />}
      <div className="conciertos-row-menu">
        {data.map((doc) => {
          return (
            <div
              className="conciertos-row-contenedor"
              onClick={() => {
                popUp(doc);
              }}
            >
              <div
                className="conciertos-row-imagen"
                style={{ backgroundImage: `url(${doc.info.img})` }}
              ></div>
              <div className="conciertos-row-info">
                <div className="conciertos-row-titulo">
                  <h1 className="conciertos-row-titulo">{doc.info.titulo}</h1>
                </div>
                <div className="d-flex align-items-center w-100">
                  <p className="conciertos-row-artistas">
                    Artistas: {doc.info.artista}
                  </p>
                  <div className="ml-auto d-flex">
                    <button
                      className="primario"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAprobar(doc.id);
                      }}
                    >
                      Aprobar
                    </button>
                    <button
                      className="secundario mb-0 ml-2"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDenegar(doc.id);
                      }}
                    >
                      Denegar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
export default ConciertosPendientes;
