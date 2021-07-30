import React from "react";
import "./chat.css";
import img from "../images/singer.jpeg";
function index() {
  // useEffect(async ()=>{

  // })
  return (
    <>
      <div>
        <div className="fondo">
          <div className="caja-pre-chat">
            <img src={img} alt="" />
            <div className="info-pre-chat">
              <h1>Habla con "Nombre" por chat privado!</h1>
              <p>El chat privado se activara en "Aca countdown"</p>
              <button>Accede al chat</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default index;
