import React from "react";
import "../contenido-menu.css";
function Perfil({ data }) {
  return (
    <>
      <div className="caja-menu-contenido perfil-menu">
        <img src={data.img} alt="" width="70px" height="70px" />
        <div className="perfil-menu-info">
          <h5>{data.usuario}</h5>
          <small>Followers {data.seguidores}</small>
        </div>
      </div>
    </>
  );
}

export default Perfil;
