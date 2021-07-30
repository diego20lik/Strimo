import React from "react";
import getData from "../../frontEndFunctions/getData.jsx";
import { useHistory, useParams } from "react-router-dom";
import Private from "../../etiquetas/index";
import { Link } from "react-router-dom";
import Contenido from "../../streaming/contenido"
// import getUserPfp from "../../frontEndFunctions/getUserPfp";
import "./style.css";

function Index() {
  const { id } = useParams();
  const history = useHistory();
  const data = getData("Videos");
  const click = () => {
    history.push(`/video/${id}`);
  };
  return (
    <>
      <div className="elemento-no-background">
        {data.element != undefined && (
          <>
            <div className="element-info">
              <h1>{data.element.titulo}</h1>
              <hr />
              <Link
                style={{ textDecoration: "none", color: "black" }}
                to={`/perfil/${data.element.de}`}
              >
                <div className="element-author">
                  <img src={data.pfp} alt="" height="40em" />
                  <p className="element-author-tag">{data.element.de}</p>
                </div>
              </Link>
              {data.element.descripcion && (
                <>
                  <small className="description-label">description:</small>
                  <div className="description">
                    <p>{data.element.descripcion}</p>
                  </div>
                </>
              )}
              <div className="botones">
                <button
                  className="primario"
                  // style={{ width: "100%" }}
                  onClick={() => click()}
                >
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
            <div className="element-image-background">
              <img src={data.element.img} alt="" />
            </div>
          </>
        )}
      </div>
      <div className="degradado streaming-layout">
        <div className="olas voltear">
          <div className="separa-lineas"></div>
          <div className="separa-lineas-2"></div>
        </div>
                <Contenido/>
      </div>
    </>
  );
}

export default Index;
