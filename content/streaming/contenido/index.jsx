import React, { useState, useEffect } from "react";
import Carousel from "../../lobby/contenido/carousel";
import PopUp from "../../popup";
import getContent from "../../lobby/contenido/getContent";
import regueton from "../../images/regueton.png";
import pop from "../../images/pop.png";
import clasica from "../../images/microfono.png";
import electronica from "../../images/electronica.png";
import rock from "../../images/rock.png";
import salsa from "../../images/salsa.jpg";
import vallenato from "../../images/vallenato.jpg";
import rap from "../../images/rap.jpg";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";
function Index() {
  const [dataPopUp, setDataPopUp] = useState();
  const [elementos, setElementos] = useState();
  const history = useHistory();
  const popUp = (data) => {
    setDataPopUp(data);
    console.log(JSON.stringify(data));
  };
  const data = getContent("Videos");
  return (
    <div>
      {dataPopUp && <PopUp data={dataPopUp} tipo="concierto" />}
      {data.length > 0 && (
        <>
          <Carousel data={{ html: recomendado(data, popUp), title: "Recomendado" }} />
        </>
      )}
    </div>
  );



  function perfiles() {
    const data = [
      {
        id: 1,
        usuario: "@Maluma",
        img:
          "https://www.am.com.mx/__export/1558970060149/sites/am/img/2019/05/27/maluma_1.jpeg_423682103.jpeg",
        seguidores: "37K",
        link: "https://twitter.com/maluma",
      },
      {
        id: 2,
        usuario: "@BadBunny",
        img:
          "https://www.minutoe.com/u/fotografias/m/2020/9/1/f768x1-46225_46352_126.jpg",
        seguidores: "104K",
        link: "https://twitter.com/sanbenito",
      },
      {
        id: 3,
        usuario: "@BrunoMars",
        img:
          "https://mui.today/__export/1581030376079/sites/mui/img/2020/02/06/bruno-mars-1.jpeg_1902800913.jpeg",
        seguidores: "340K",
        link: "https://twitter.com/brunomars",
      },
      {
        id: 4,
        usuario: "@LadyGaga",
        img:
          "https://files.rcnradio.com/public/styles/img_galeria/public/2019-01/lady_gaga_en_los_globos_de_oro_3_0.jpg?itok=IWA5ujWI",
        seguidores: "201K",
        link: "https://twitter.com/ladygaga",
      },
      {
        id: 5,
        usuario: "@Residente",
        img:
          "https://storage.googleapis.com/afs-prod/media/media:9bf266faefb847dea4edf1d10cae72bd/800.jpeg",
        seguidores: "24K",
        link: "https://twitter.com/Residente",
      },
    ];
    return (
      <>
          {data.map((perfil) => {
            return (
              <div className="perfil " key={perfil.id}>
                <a href={perfil.link} target="_blank" rel="noreferrer">
                  <div
                    className="perfil-i"
                    style={{ backgroundImage: `url(${perfil.img})` }}
                  ></div>
                  <h5>{perfil.usuario}</h5>
                  <p>Seguidores: {perfil.seguidores}</p>
                </a>
              </div>
            );
          })}
      </>
    );
  }
  
  function recomendado( data, popUp ) {
    const arr = []
    data.map((datos) => {
      arr.push(
      <>
        {datos.info.privatizar?
          <div className="item" key={datos.id}  onClick={() => popUp(datos)}>
            <div
            className="espacio"
            style={{ backgroundImage: `url(${datos.info.img})` }}
            >
              <div className="privado"><small>Privado</small></div>
              {datos.info.NSFW && 
                <div className="nsfw mx-1"><small>+18</small></div>
              }
            </div>
            <div className="titulo">
              <h5><b>{datos.info.titulo}</b></h5>
              <div className="mt-auto contenido-autor" onClick={(e)=>{
                e.stopPropagation()
                history.push(`/perfil/${datos.info.de}`)
                }}>{datos.info.de}</div>
            </div>
          </div>
          :
          <div className="item" key={datos.id} onClick={() => history.push(`/video/${datos.id}`)}>
            <div
            className="espacio"
            style={{ backgroundImage: `url(${datos.info.img})` }}
            >
              {datos.info.NSFW && 
                <div className="nsfw mx-1"><small>+18</small></div>
              }
            </div>
            <div className="titulo">
              <h5><b>{datos.info.titulo}</b></h5>
              <div className="mt-auto contenido-autor" onClick={(e)=>{
                e.stopPropagation()
                history.push(`/perfil/${datos.info.de}`)
                }}>{datos.info.de}</div>
            </div>
          </div>
        }
      </>
      )
    })
    return arr
  }
};
export default Index;

