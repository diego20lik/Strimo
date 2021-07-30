import React, { useState, useEffect } from "react";
import Carousel from "../../lobby/contenido/carousel";
import { Link, useLocation } from "react-router-dom";
// import PopUp from "../../popup";
import getContent from "../../lobby/contenido/getContent";
import stmo from "../../images/play png.png";
import "react-multi-carousel/lib/styles.css";
import { useHistory } from "react-router-dom";
function Index() {
  let location = useLocation();
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
      {/* {dataPopUp && <PopUp data={dataPopUp} tipo="concierto" />} */}
      {data.length > 0 && (
        <>
          <Carousel
            data={{ html: recomendado(data, popUp), title: "Recommended" }}
          />
          <Carousel data={{ html: galeria(), title: "NFT Gallery" }} />
        </>
      )}
    </div>
  );
  function galeria() {
    const data = [
      {
        id: 1,
        author: "Vanessa",
        img: "https://random.imagecdn.app/400/400",
        artName: "Imagen Random",
        price: "50",
      },
      {
        id: 2,
        author: "Joseph",
        img: "https://random.imagecdn.app/401/400",
        artName: "Imagen Random",
        price: "50",
      },
      {
        id: 3,
        author: "Jessica",
        img: "https://random.imagecdn.app/400/401",
        artName: "Imagen Random",
        price: "50",
      },
      {
        id: 4,
        author: "Charles",
        img: "https://random.imagecdn.app/401/399",
        artName: "Imagen Random",
        price: "50",
      },
      {
        id: 5,
        author: "Charles",
        img: "https://random.imagecdn.app/201/401",
        artName: "Imagen Random",
        price: "50",
      },
      {
        id: 6,
        author: "Charles",
        img: "https://random.imagecdn.app/401/301",
        artName: "Imagen Random",
        price: "50",
      },
    ];
    const arr = [];
    data.map((datos) => {
      arr.push(
        <>
          <div
            className="gallery-item"
            key={datos.id}
            // onClick={() => history.push(`/video/${datos.id}`)}
          >
            <div
              className="gallery-img"
              // style={{ backgroundImage: `url(${datos.img})` }}
            >
              <img src={datos.img} alt="" />
            </div>
            <div className="gallery-info">
              <h5>
                <b>{datos.artName}</b>
              </h5>
              <div
                className="mt-auto contenido-autor"
                onClick={(e) => {
                  e.stopPropagation();
                  // history.push(`/perfil/${datos.author}`);
                }}
              >
                <div className="nft-data">
                  {datos.author}
                  <h5 className="nft-price">
                    {datos.price}{" "}
                    <span>
                      <img src={stmo} className="stmo-token-image" alt="" />
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    });
    return arr;
  }
  function recomendado(data, popUp) {
    const arr = [];
    data.map((datos) => {
      arr.push(
        <>
          {datos.info.privatizar ? (
            <Link
              style={{ textDecoration: "none", color: "black" }}
              to={{
                pathname: `/v/${datos.id}`,
                state: { background: location },
              }}
            >
              <div
                className="item"
                key={datos.id}
                // onClick={() => popUp(datos)}
              >
                <div
                  className="espacio"
                  style={{ backgroundImage: `url(${datos.info.img})` }}
                >
                  <div className="privado">
                    <small>Private</small>
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
            </Link>
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
    });
    return arr;
  }
}
export default Index;
