import React, { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import firebase from "../../utils/firebase";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { useParams } from "react-router-dom";
import Err from "../popup/err";
import Message from "../popup/message";
import Loading from "../loading";
import { useHistory } from "react-router-dom";
import Contentido from "./content";
import "./perfil.css";
function Lobby() {
  const history = useHistory();
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const { pname } = useParams();
  const [data, setData] = useState(false);
  const [videos, setVideos] = useState([]);
  const { currentUser, nickname } = useAuth();
  useEffect(() => {
    const unsubsciber = firebase
      .firestore()
      .collection("Usuarios")
      .where("nickname", "==", pname)
      .get()
      .then((snap) => {
        if (!snap.empty) {
          snap.docs.map((doc) => {
            setData(doc.data());
          });
          return;
        }
        setErr("Usuario no existe");
        setTimeout(() => {
          history.goBack();
        }, 2500);
      });
    return unsubsciber;
  }, []);
  return (
    <div>
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <div className="degradado pagina-perfil">
        <div className=" caja-blanca-2 fondo-blanco perfil-info">
          {data && (
            <>
              {!data.pfp ? (
                <>
                  <img
                    alt=""
                    onClick={() => history.push("/foto-perfil")}
                    src={blankImaage}
                    width="100px"
                  />
                </>
              ) : (
                <img
                  alt=""
                  src={data.pfp}
                  onClick={() => history.push("/foto-perfil")}
                  width="100px"
                  height="100px"
                  className="imagen-perfil-perfil"
                />
              )}
              <h1 className="mt-3">{data.nickname}</h1>
              {/* <h3>{data.user}</h3> */}
            </>
          )}
        </div>
        <Contentido />
      </div>
    </div>
  );
}
export default Lobby;
