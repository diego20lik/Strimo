import React, { useState, useReducer } from "react";
import "./conciertos-row.css";
import PopUp from "../popup";
import { useHistory } from "react-router-dom";
import { Link, useLocation } from "react-router-dom";
import Private from "../etiquetas/index";
function Index({ data }) {
  let location = useLocation();
  const history = useHistory();
  const [dataPopUp, setDataPopUp] = useState();
  const popUp = (data) => {
    setDataPopUp(data);
  };
  const live = "https://images.emojiterra.com/mozilla/512px/1f534.png";
  return (
    <>
      {dataPopUp && <PopUp data={dataPopUp} tipo="concierto" />}
      <div className="videos-row-menu">
        {data.map((doc) => {
          return (
            <>
              {doc.info.privatizar ? (
                <Link
                  className="videos-row-contenedor"
                  style={{ textDecoration: "none", color: "black" }}
                  to={{
                    pathname: `/v/${doc.id}`,
                    state: { background: location },
                  }}
                >
                  {/* <div
                    className="videos-row-contenedor"
                    onClick={() => {
                      popUp(doc);
                    }}
                  > */}
                  <div
                    className="conciertos-row-imagen"
                    style={{ backgroundImage: `url(${doc.info.img})` }}
                  ></div>
                  <div className="conciertos-row-info">
                    <div className="conciertos-row-titulo">
                      {doc.info.envivo && (
                        <div
                          className="circulo-rojo"
                          style={{
                            backgroundImage: `url(${live})`,
                          }}
                        ></div>
                      )}
                      <h1 className="conciertos-row-titulo">
                        {doc.info.titulo}
                      </h1>
                    </div>
                    <div className="d-flex align-items-center w-100">
                      <p className="conciertos-row-artistas">{doc.info.de}</p>
                      <div className="ml-auto d-flex">
                        {doc.info.NSFW && <div className="nsfw mx-1">+18</div>}
                        <Private />
                      </div>
                    </div>
                  </div>
                  {/* </div> */}
                </Link>
              ) : (
                <div
                  className="videos-row-contenedor"
                  onClick={() => {
                    history.push(`/video/${doc.id}`);
                  }}
                >
                  <div
                    className="conciertos-row-imagen"
                    style={{ backgroundImage: `url(${doc.info.img})` }}
                  ></div>
                  <div className="conciertos-row-info">
                    <div className="conciertos-row-titulo">
                      {doc.info.envivo && (
                        <div
                          className="circulo-rojo"
                          style={{
                            backgroundImage: `url(${live})`,
                          }}
                        ></div>
                      )}
                      <h1 className="conciertos-row-titulo">
                        {doc.info.titulo}
                      </h1>
                    </div>
                    <div className="d-flex align-items-center w-100">
                      <p className="conciertos-row-artistas">{doc.info.de}</p>
                      <div className="ml-auto d-flex">
                        {doc.info.NSFW && <div className="nsfw">+18</div>}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          );
        })}
      </div>
    </>
  );
}
export default Index;
