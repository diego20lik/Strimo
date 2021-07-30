import React, { useState, useEffect } from "react";
// import Concierto from "./concierto.jsx";
// import Landing from "./landing";
// import Nft from "./nft.jsx";
// import ConciertoMuestra from "./conciertoMuestra";
import { useHistory, useParams } from "react-router-dom";
import getData from "../../frontEndFunctions/getData.jsx";
import Private from "../../etiquetas/index";
import { Link } from "react-router-dom";
import "../../../styles/popup-link.css";
function Index() {
  const { id } = useParams();
  const history = useHistory();
  // const [open, setOpen] = useState(true);
  const data = getData("Videos");
  const click = () => {
    history.push(`/video/${id}`);
  };
  const closePopUp = () => {
    // setOpen(false);
    history.goBack();
  };
  return (
    <>
      <div className="overlay" onClick={() => closePopUp()} id="overlay">
        <div className="popup" onClick={(e) => e.stopPropagation()} id="popup">
          {data.element != undefined && (
            <>
              <div className="info d-flex align-items-center justify-content-center">
                <div className="pop-up-titulo">
                  <h1>{data.element.titulo}</h1>
                </div>
                <Link
                  style={{ textDecoration: "none", color: "black" }}
                  to={`/perfil/${data.element.de}`}
                >
                  <div className="element-author">
                    <img src={data.pfp} alt="" height="40em" />
                    <p className="element-author-tag">{data.element.de}</p>
                  </div>
                </Link>
                <div
                  className="phone-img"
                  style={{
                    background: `url(${data.element.img})`,
                    backgroundSize: "100% 100%",
                  }}
                ></div>
                <div className="texto">
                  <p className="lorem">{data.element.descripcion}</p>

                  <div className="d-flex">
                    <Private />
                    {data.element.NSFW && (
                      <div className="nsfw mx-1">
                        <small>+18</small>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="img-btn">
                <div
                  className="popup-img-video"
                  style={{
                    background: `linear-gradient(transparent 70%, rgba(255, 255, 255, 1)), linear-gradient(to Left, transparent 70%, rgba(255, 255, 255, 1)), url(${data.element.img})`,
                    backgroundSize: "100% 100%",
                    backgroundRepeat: "none",
                  }}
                ></div>
                <div className="botones">
                  <button className="primario" onClick={() => click()}>
                    Watch
                  </button>
                  <div className="secondary-buttons">
                    <button className="secundario" style={{ width: "50%" }}>
                      Watch Trailer
                    </button>
                    <button className="secundario" style={{ width: "50%" }}>
                      Related
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <div className="boton-x">
          <h1 className="blanco">X</h1>
        </div>
      </div>
    </>
  );
}

export default Index;
