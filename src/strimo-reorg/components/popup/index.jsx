import React, { useState, useEffect } from "react";
import Concierto from "./concierto.jsx";
import Landing from "./landing";
import Nft from "./nft.jsx";
import ConciertoMuestra from "./conciertoMuestra";
import { useHistory } from "react-router-dom";
import "../../styles/popup-styles.css";
function Index({ data, tipo }) {
  const history = useHistory();
  const [open, setOpen] = useState(true);
  useEffect(() => {
    setOpen(true);
  }, [data]);
  const closePopUp = () => {
    setOpen(false);
    // history.goBack();
  };
  return (
    <>
      {open && (
        <div className="overlay" onClick={() => closePopUp()} id="overlay">
          <div
            className="popup"
            onClick={(e) => e.stopPropagation()}
            id="popup"
          >
            {tipo === "concierto" && (
              <Concierto data={data.info} id={data.id} />
            )}
            {tipo === "concierto-muestra" && (
              <ConciertoMuestra data={data.info} id={data.id} />
            )}
            {tipo === "landing" && <Landing />}
            {tipo === "nft" && <Nft data={data} />}
          </div>
          <div className="boton-x">
            <h1 className="blanco">X</h1>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
