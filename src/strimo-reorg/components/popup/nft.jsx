import React from "react";
import "../../styles/nft.css";
function Nft({ data }) {
  return (
    <div className="p-5 container-fluid">
      <div className="row d-flex justify-content-center align-items-center nft-column">
        <div className="col-md-7 imagen-nft-popup d-flex justify-content-center align-items-center flex-column">
          <img src={data.img} alt="" />
        </div>
        <div className="h-100 col-md-5 d-flex flex-column">
          <h1 className="mb-2 text-left">Picture Name</h1>
          <hr />
          <h3>Propiedad de: user</h3>
          <div className="borde-gris p-3 my-4 d-flex justify-content-evenly w-100 align-items-center">
            <p className="m-0">Precio:</p>
            <h1 className="m-0">4.25</h1>
            <p>ETH</p>
            <small>(8800.60$)</small>
          </div>
          <button className="primario" style={{ height: "50px" }}>
            Comprar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default Nft;
