import React, { useState, useRef, useEffect } from "react";
import Index from "./contenido";
import Siguiendo from "./siguiendo/siguiendo";
import Categoria from "./categoria/categoria";
import Video from "../video/video";
import checkScreenSize from "../frontEndFunctions/checkScreeSize";
import { Link, useLocation } from "react-router-dom";
import LobbyNav from "./lobby-nav";
import WavesLight from "../waves/wavesLight.jsx";
import "./streaming.css";

function Stream() {
  let location = useLocation();
  const mobile = checkScreenSize();
  const refCategorias = useRef(null);
  const [categoria, setCategoria] = useState(false);
  const refSiguiendo = useRef(null);
  const [siguiendo, setSiguiendo] = useState(false);
  const handleMenu = async (ref, setState, state) => {
    if (!mobile) {
      setState(!state);
      if (!state) {
        ref.current.style.width = "20%";
        ref.current.style.height = "100vh";
        ref.current.style.bottom = "0px";
        return;
      }
      ref.current.style.width = "5%";
      ref.current.style.height = "50px";
      ref.current.style.bottom = "5px";
      return;
    }
    setState(!state);
    if (!state) {
      ref.current.style.width = "70%";
      ref.current.style.height = "100vh";
      ref.current.style.bottom = "0px";
      return;
    }
    ref.current.style.width = "5%";
    ref.current.style.height = "50px";
    ref.current.style.bottom = "5px";
    return;
  };
  return (
    <div>
      <div className="degradado streaming-layout">
        <div className="contenido">
          <LobbyNav />
          <div
            ref={refCategorias}
            onClick={() => handleMenu(refCategorias, setCategoria, categoria)}
            className="categorias"
          >
            {!categoria ? (
              <div className="flecha-menu">
                <h1>
                  <b>C</b>
                </h1>
              </div>
            ) : (
              <>
                <div className="titulo-menu">
                  <h1 className="text-center">
                    <b>Categories</b>
                  </h1>
                </div>
                <Categoria />
              </>
            )}
          </div>
          <Index />
          <WavesLight>
            <div className="video-lobby-displayer">
              <div className="horizontal-center">
                <Video
                  url="https://firebasestorage.googleapis.com/v0/b/strimo-9e1a1.appspot.com/o/video-test%2FVID-20210419-WA0012.mp4?alt=media&token=c1988061-1873-4491-8c91-51b617fa6f80"
                  titulo="Video de Inicio"
                />
              </div>
            </div>
          </WavesLight>
          <Index />
          <div style={{ paddingTop: "300px" }}></div>
          <div
            ref={refSiguiendo}
            onClick={() => handleMenu(refSiguiendo, setSiguiendo, siguiendo)}
            className="siguiendo"
          >
            {siguiendo ? (
              <>
                <div className="titulo-menu">
                  <h1 className="text-center">
                    <b>Following</b>
                  </h1>
                </div>
                <Siguiendo />
              </>
            ) : (
              <div className="flecha-menu">
                <h1>
                  <b>F</b>
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Stream;
