import React, { useState, useRef } from "react";
import Elemento from "./elemento";
import regueton from "../../../images/regueton.png";
import pop from "../../../images/pop.png";
import clasica from "../../../images/microfono.png";
import electronica from "../../../images/electronica.png";
import rock from "../../../images/rock.png";
import salsa from "../../../images/salsa.jpg";
import vallenato from "../../../images/vallenato.jpg";
import rap from "../../../images/rap.jpg";
function Categoria() {
  const data = [
    {
      id: 1,
      categoria: "Regueton",
      img: regueton,
      seguidores: "14M",
    },
    {
      id: 2,
      categoria: "Pop",
      img: pop,
      seguidores: "5M",
    },
    {
      id: 3,
      categoria: "Clásica",
      img: clasica,
      seguidores: "10M",
    },
    {
      id: 4,
      categoria: "Rock",
      img: rock,
      seguidores: "34K",
    },
    {
      id: 5,
      categoria: "Electrónica",
      img: electronica,
      seguidores: "1M",
    },
    {
      id: 6,
      categoria: "Salsa",
      img: salsa,
      seguidores: "1M",
    },
    {
      id: 7,
      categoria: "Vallenato",
      img: vallenato,
      seguidores: "1M",
    },
    {
      id: 8,
      categoria: "Rap",
      img: rap,
      seguidores: "1M",
    },
  ];
  const [showButton, setShowButton] = useState(false);
  const refInput = useRef();
  const handelChange = () => {
    if (refInput.current.value) return setShowButton(true);
    setShowButton(false);
  };
  return (
    <>
      <div onClick={(e) => e.stopPropagation()} className="siguiendo-contenido">
        <form className="busqueda-2">
          <input
            className="barra-busqueda"
            ref={refInput}
            type="text"
            placeholder="Search"
            onChange={() => {
              handelChange();
            }}
          />
          {showButton && (
            <button
              className="primario"
              type="submit"
              style={{
                marginTop: "3px",
                width: "100%",
                minWidth: "fit-content",
              }}
            >
              Search
            </button>
          )}
        </form>
        {data.map((doc) => {
          return (
            <>
              <Elemento data={doc} />
              {/* <Perfil data={doc}/> */}
            </>
          );
        })}
      </div>
    </>
  );
}

export default Categoria;
