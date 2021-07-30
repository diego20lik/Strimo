import React from "react";
import { useHistory } from "react-router-dom";
import "../../../styles/popup.css";
// import img from "../../images/concierto.jpg";
function Popup({ titulo, img, closePopUp, id, entradasVip, envivo }) {
  const history = useHistory();
  const click = () => {
    history.push(`/pago/${id}`);
  };
  return (
    <>
      <div className="overlay" onClick={() => closePopUp()} id="overlay">
        <div className="popup" onClick={(e) => e.stopPropagation()} id="popup">
          <div className="info">
            <div className="pop-up-titulo">
              <h1>{titulo}</h1>
            </div>
            <div
              className="phone-img"
              style={{
                background: `url(${img})`,
                backgroundSize: "100% 100%",
              }}
            ></div>
            <div className="texto">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                tincidunt, justo a feugiat consequat, massa erat elementum
                felis, non blandit magna tortor non diam. Suspendisse et
                suscipit massa, eu porttitor ex. Suspendisse eu tempor erat.
                Nullam ex dolor, ultricies in tempor quis, accumsan in ante.
              </p>
              {envivo && (
                <p className="entradas">
                  Quedan solo: {entradasVip} entradas vip disponibles!
                </p>
              )}
            </div>
          </div>
          <div className="img-btn">
            <div
              className="img"
              style={{
                background: `linear-gradient(transparent 70%, rgba(255, 255, 255, 1)), linear-gradient(to Left, transparent 70%, rgba(255, 255, 255, 1)), url(${img})`,
                backgroundSize: "100% 100%",
              }}
            ></div>
            <div className="botones">
              <button className="primario" onClick={() => click()}>
                Ver
              </button>
              <div className="secondary-buttons">
                <button className="secundario" style={{ width: "50%" }}>
                  Ver Trailer
                </button>
                <button className="secundario" style={{ width: "50%" }}>
                  Relacionados
                </button>
              </div>
            </div>
          </div>
          {/* <div
            className="img"
            style={{
              background: `linear-gradient(rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4)), url(${img})`,
              backgroundSize: "100% 100%",
            }}
          >
            <h1>Titulo</h1>
          </div>
          <div className="info">
            <div className="text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
              tincidunt, justo a feugiat consequat, massa erat elementum felis,
              non blandit magna tortor non diam. Suspendisse et suscipit massa,
              eu porttitor ex. Suspendisse eu tempor erat. Nullam ex dolor,
              ultricies in tempor quis, accumsan in ante.
            </div>
            <div className="botones">
              <button className="main-button">Ver</button>
              <div className="secondary-buttons">
                <button>Ver Trailer</button>
                <button>Relacionados</button>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
}
export default Popup;
