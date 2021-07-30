import React, { useState, useRef, useEffect } from "react";
import Index from "./contenido"
import { ReactComponent as ReactLeft } from "../images/iconmonstr-angel-left-thin.svg";
import { ReactComponent as ReactRight } from "../images/iconmonstr-angel-right-thin.svg";
import Siguiendo from "./siguiendo/siguiendo"
import Categoria from "./categoria/categoria"
import Video from "../video/video"
import isVisible from "../frontEndFunctions/isVisible"
import checkScreenSize from "../frontEndFunctions/checkScreeSize"
import "./streaming.css";

function Stream() {
  const videoVisibility = useRef()
  const refCategorias = useRef(null)
  const [categoria, setCategoria] = useState(false)
  const refSiguiendo = useRef(null)
  const [siguiendo, setSiguiendo] = useState(false)
  const handleMenu =async ( ref, setState, state)=>{
    setState(!state)
    if(!state){
      ref.current.style.width = "20%"
      ref.current.style.height = "100vh"
      ref.current.style.bottom = "0px"
      return
    }
    ref.current.style.width = "5%"
    ref.current.style.height = "250px"
    ref.current.style.bottom = "5px"
  }
  return (
    <div>
      <div className="degradado streaming-layout">
        <div ref={refCategorias} onClick={()=>handleMenu(refCategorias, setCategoria, categoria)} className="categorias">
          {!categoria?
            <div className="texto-vertical flecha-menu">
              <h1 ><b>Categoría</b></h1>
            </div>
          :
          <>
          <div className="titulo-menu">
            <h1 className="text-center"><b>Categoría</b></h1>
          </div>
          <Categoria/>
          </>
          }
        </div> 
        <div className="contenido">
            <Index/>
            <div className="separa-lineas"></div>
            <div className="horizontal-center" ref={videoVisibility}>
              <Video url="https://firebasestorage.googleapis.com/v0/b/strimo-9e1a1.appspot.com/o/video-test%2FVID-20210419-WA0012.mp4?alt=media&token=c1988061-1873-4491-8c91-51b617fa6f80" titulo="Video de Inicio" mute={true}/>
            </div>
            <Index/>
        </div>
        <div ref={refSiguiendo} onClick={()=>handleMenu(refSiguiendo, setSiguiendo, siguiendo)} className="siguiendo">
          {siguiendo?
              <>
              <div className="titulo-menu">
                <h1 className="text-center"><b>Siguiendo</b></h1>
              </div>
                <Siguiendo />
              </>
            :
            <div className="texto-vertical flecha-menu">
            <h1 ><b>Siguiendo</b></h1>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default Stream;

