import React, { useState, useRef } from "react";
import "./siguiendo.css";
import Perfil from "./perfil";
function Siguiendo() {
  const data = [
    {
      id: 1,
      usuario: "@Maluma",
      img: "https://www.am.com.mx/__export/1558970060149/sites/am/img/2019/05/27/maluma_1.jpeg_423682103.jpeg",
      seguidores: "37K",
      link: "https://twitter.com/maluma",
    },
    {
      id: 2,
      usuario: "@BadBunny",
      img: "https://www.minutoe.com/u/fotografias/m/2020/9/1/f768x1-46225_46352_126.jpg",
      seguidores: "104K",
      link: "https://twitter.com/sanbenito",
    },
    {
      id: 3,
      usuario: "@BrunoMars",
      img: "https://mui.today/__export/1581030376079/sites/mui/img/2020/02/06/bruno-mars-1.jpeg_1902800913.jpeg",
      seguidores: "340K",
      link: "https://twitter.com/brunomars",
    },
    {
      id: 4,
      usuario: "@LadyGaga",
      img: "https://files.rcnradio.com/public/styles/img_galeria/public/2019-01/lady_gaga_en_los_globos_de_oro_3_0.jpg?itok=IWA5ujWI",
      seguidores: "201K",
      link: "https://twitter.com/ladygaga",
    },
    {
      id: 5,
      usuario: "@Residente",
      img: "https://storage.googleapis.com/afs-prod/media/media:9bf266faefb847dea4edf1d10cae72bd/800.jpeg",
      seguidores: "24K",
      link: "https://twitter.com/Residente",
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
              <Perfil data={doc} />
            </>
          );
        })}
      </div>
    </>
  );
}

export default Siguiendo;
