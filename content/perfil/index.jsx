import React, {useEffect, useState} from "react";
import { useAuth } from "../context/authContext";
import firebase from "../../utils/firebase"
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import Err from "../popup/err"
import Message from "../popup/message"
import Loading from "../loading"
import { useHistory } from "react-router-dom";
import ConciertosRow from "../conciertos-row";
import "./perfil.css"
function Lobby() {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const { pname } = useParams();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [crearFotoDePerfil, setCrearFotoDePerfil] = useState(false);
  const [data, setData] = useState(false);
  const [videos, setVideos] = useState([]);
  const { currentUser, nickname } = useAuth();
  useEffect(() => {
    const unsubsciber = firebase.firestore().collection("Usuarios").where("nickname", "==", pname).get().then(snap=>{
      if(!snap.empty){
        snap.docs.map(doc=>{
          setData(doc.data())
        })
        return
      }
      setErr("Usuario no existe")
      setTimeout(() => {
        history.goBack()
      }, 2500);
    })
    return unsubsciber
  }, []);
  useEffect(()=>{
    const unsubsciber=firebase.firestore().collection("Videos").where("de", "==", pname).onSnapshot(snap=>{
      setVideos([])
      if(!snap.empty){
        snap.docs.map(doc=>{
            setVideos(videos => videos.concat({info:doc.data(), id:doc.id}))
        })
      }
    })
    return unsubsciber
  }, [])
  return (
    <div>
      {err&&<Err message={err} setErr={setErr}/>}
      {message&&<Message message={message} setMessage={setMessage}/>}
      {loading&&<Loading/>}
      <div className="degradado p-3 container-fluid">
        <div className="row">
          <div className="col-md-5 mb-5">
            <div className="col-12 caja-blanca-2 fondo-blanco d-flex flex-column justify-content-center align-items-center">
              {data&&
              <>
            {!data.pfp ? (
              <>
                <img alt="" onClick={()=>history.push("/foto-perfil")} src={blankImaage} width="100px" />
              </>
              ) : (
                <img
                alt=""
                src={data.pfp}
                onClick={()=>history.push("/foto-perfil")}
                width="100px"
                className="imagen-perfil-perfil"
                />
              )}
              <h1 className="mt-3">{data.nickname}</h1>
              <h3>{data.user}</h3>
            </>
            }
            </div>
          </div>
          <div className="col-md-7">
            <div className="col-12 caja-blanca-2 fondo-blanco contenedor-videos d-flex flex-column justify-content-center align-items-center">
              {pname===nickname&&
              <div className="crea-video">
                <Link style={{ textDecoration: "none" }} to="/subir-video">
                  <h3 className="crea-video-link">Subir video!</h3>
                </Link>
              </div>
              }
              <hr className="linea"/>
              {videos.length>0&&
                <ConciertosRow data={videos}/>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Lobby;
