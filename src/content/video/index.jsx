import React, { useState, useRef, useEffect } from "react";
import screenfull from "screenfull";
import Chat from "../chat/chat";
import firebase from "../../utils/firebase";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Video from "./video";
import "./video.css";
function Index() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const { id } = useParams();
  const [tipo, setTipo] = useState(true);
  const [info, setInfo] = useState();
  const [link, setLink] = useState(
    "https://firebasestorage.googleapis.com/v0/b/strimo-9e1a1.appspot.com/o/video-test%2FVID-20210419-WA0012.mp4?alt=media&token=c1988061-1873-4491-8c91-51b617fa6f80"
  );
  const [show, setShow] = useState(false);

  useEffect(() => {
    const unsubscriber = firebase
      .firestore()
      .collection("Videos")
      .doc(id)
      .get()
      .then((snap) => {
        if (!snap.exists) return history.push("/streaming");
        if (!snap.data().privatizar) {
          setLink(snap.data().video);
          setInfo(snap.data());
          setShow(true);
          return;
        }
        firebase
          .firestore()
          .collection("Pagos")
          .where("usuario", "array-contains", currentUser.uid)
          .where("video", "==", id)
          .get()
          .then((snap) => {
            if (snap.empty) {
              history.push(`/pago/${id}`);
              return;
            }
            firebase
              .firestore()
              .collection("Videos")
              .doc(id)
              .get()
              .then((snap) => {
                setInfo(snap.data());
              });
            setShow(true);
            snap.forEach((doc) => {
              setTipo(doc.data().tipo);
            });
          });
      });
    return unsubscriber;
  }, []);
  return (
    <>
      {show && (
        <div className="degradado">
          <div className="player-fondo">
            {info && <Video titulo={info.titulo} url={link} />}
            {tipo == "VIP" && (
              <div className="chat">
                <h1 className="titulo m-0">Chat</h1>
                <Chat />
              </div>
            )}
          </div>
          <div className=" d-flex justify-content-center align-items-center w-100">
            <div className="caja-blanca-2 w-75 fondo-blanco">
              {info && (
                <>
                  <Link to={`/perfil/${info.de}`}>
                    <h4>{info.de}</h4>
                  </Link>
                  <hr />
                  <p className="text-center">Description:</p>
                  <h5 className="text-justify">{info.descripcion}</h5>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Index;
