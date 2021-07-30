import React, { useState } from "react";
import Carousel from "./carousel";
import PopUp from "../../popup";
import getContent from "./getContent";
import CarouselTest from "react-multi-carousel";
import regueton from "../../../images/regueton.png";
import pop from "../../../images/pop.png";
import clasica from "../../../images/microfono.png";
import electronica from "../../../images/electronica.png";
import rock from "../../../images/rock.png";
import salsa from "../../../images/salsa.jpg";
import vallenato from "../../../images/vallenato.jpg";
import rap from "../../../images/rap.jpg";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";
function Index() {
  const [dataPopUp, setDataPopUp] = useState();
  const history = useHistory();
  const popUp = (data) => {
    setDataPopUp(data);
    console.log(JSON.stringify(dataPopUp));
  };
  const data = getContent("Videos");
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 30,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };
  return (
    <>
      {dataPopUp && <PopUp data={dataPopUp} tipo="concierto" />}
      <div>
        {data.length > 0 && (
          <>
            <Recomendado dato={data} popUp={popUp} responsive={responsive} />
            {/* <Carousel data={{ html: perfiles(), title: "Perfiles" }} /> */}
            <Perfiles responsive={responsive} />
            <Generos />
          </>
        )}
      </div>
    </>
  );
}

function Recomendado({ dato, popUp, responsive }) {
  const history = useHistory();
  return (
    <>
      <h1 className="titulo-seccion font-title">Recomendados</h1>
      {dato.map((datos) => {
        return (
          <>
            {datos.info.privatizar ? (
              <div className="item" key={datos.id} onClick={() => popUp(datos)}>
                <div
                  className="espacio"
                  style={{ backgroundImage: `url(${datos.info.img})` }}
                >
                  <div className="privado">
                    <small>Privado</small>
                  </div>
                  {datos.info.NSFW && (
                    <div className="nsfw mx-1">
                      <small>+18</small>
                    </div>
                  )}
                </div>
                <div className="titulo">
                  <h5>
                    <b>{datos.info.titulo}</b>
                  </h5>
                  <div
                    className="mt-auto contenido-autor"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/perfil/${datos.info.de}`);
                    }}
                  >
                    {datos.info.de}
                  </div>
                </div>
              </div>
            ) : (
              <div
                className="item"
                key={datos.id}
                onClick={() => history.push(`/video/${datos.id}`)}
              >
                <div
                  className="espacio"
                  style={{ backgroundImage: `url(${datos.info.img})` }}
                >
                  {datos.info.NSFW && (
                    <div className="nsfw mx-1">
                      <small>+18</small>
                    </div>
                  )}
                </div>
                <div className="titulo">
                  <h5>
                    <b>{datos.info.titulo}</b>
                  </h5>
                  <div
                    className="mt-auto contenido-autor"
                    onClick={(e) => {
                      e.stopPropagation();
                      history.push(`/perfil/${datos.info.de}`);
                    }}
                  >
                    {datos.info.de}
                  </div>
                </div>
              </div>
            )}
          </>
        );
      })}
    </>
  );
  // ;<div className="final"></div>
}

function Perfiles({ responsive }) {
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
  return (
    <>
      <h1 className="titulo-seccion font-title">
        Perfiles que te pueden Interesar
      </h1>
      <CarouselTest
        removeArrowOnDeviceType={["tablet", "mobile"]}
        responsive={responsive}
        draggable={true}
        swipeable={true}
        infinite={true}
        autoPlaySpeed={5000}
        autoPlay={true}
        keyBoardControl={true}
        centerMode={true}
        // className="p-5"
      >
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
      </CarouselTest>
    </>
  );
}

const Generos = () => {
  const responsiveGeneros = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 2,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      partialVisibilityGutter: 20,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      partialVisibilityGutter: 10,
    },
  };
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

  return (
    <>
      <h1 className="titulo-seccion font-title">Géneros</h1>
      <CarouselTest
        removeArrowOnDeviceType={["tablet", "mobile"]}
        responsive={responsiveGeneros}
        draggable={true}
        swipeable={true}
        // showDots={true}
        infinite={true}
        centerMode={true}
        keyBoardControl={true}
        autoPlaySpeed={5000}
        //autoPlay={true}
        // className="p-5"
      >
        {data.map((genero, i) => {
          return (
            <div className="display1" key={genero.id}>
              <div
                className="display1-i h-100"
                style={{ backgroundImage: `url(${genero.img})` }}
              ></div>
              <div className="contenido h-100">
                <h4>{genero.categoria}</h4>
                <div className="footer-div">
                  <p>Seguidores: {genero.seguidores} </p>
                </div>
              </div>
            </div>
          );
        })}
      </CarouselTest>
    </>
  );
};
export default Index;
