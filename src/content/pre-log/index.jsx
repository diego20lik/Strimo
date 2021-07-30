import React from "react";
import "./pre-log.css";
import { Link } from "react-router-dom";
function index() {
  return (
    <div className="degradado p-4">
      <h1 className="text-center blanco">¿A dónde quieres ir?</h1>
      <div className="pre-buttons">
          <Link className="caja-link" style={{ textDecoration: "none" }} to="/streaming">
              <div className="straming-background"></div>
                <h1 className="pre-title">
                  <b> Streaming</b>
                </h1>
          </Link>
          <Link className="caja-link" style={{ textDecoration: "none" }} to="/galeria">
              <div className="nft-background"></div>
              <h1 className="pre-title">
                <b> Galería NFT</b>
              </h1>
          </Link>
      </div>
    </div>
  );
}

export default index;
