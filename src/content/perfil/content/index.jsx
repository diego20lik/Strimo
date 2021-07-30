import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ConciertosRow from "../../conciertos-row";
import { useAuth } from "../../context/authContext";
import firebase from "../../../utils/firebase";
function Index() {
  const { pname } = useParams();
  const { currentUser, nickname } = useAuth();
  const [videos, setVideos] = useState([]);
  const [content, setContent] = useState();
  useEffect(() => {
    const unsubsciber = firebase
      .firestore()
      .collection("Videos")
      .where("de", "==", pname)
      .onSnapshot((snap) => {
        setVideos([]);
        if (!snap.empty) {
          snap.docs.map((doc) => {
            setVideos((videos) =>
              videos.concat({ info: doc.data(), id: doc.id })
            );
          });
        }
      });
    return unsubsciber;
  }, []);
  return (
    <div className=" caja-blanca-2 fondo-blanco perfil-contenido ">
      {pname === nickname && (
        <div className="upload-content">
          <Link style={{ textDecoration: "none" }} to="/subir-video">
            <h3 className="crea-video-link">Upload video!</h3>
          </Link>
          <Link style={{ textDecoration: "none" }} to="/create-nft">
            <h3 className="crea-video-link">Upload NFT!</h3>
          </Link>
        </div>
      )}
      <div className="select-profile-content">
        <div className="profile-content-button" onClick={() => setContent("v")}>
          <h4>
            <b>Videos</b>
          </h4>
        </div>
        <div className="profile-content-button">
          <h4>NFTs</h4>
        </div>
      </div>
      <hr className="linea" />
      {videos.length > 0 && <ConciertosRow data={videos} />}
    </div>
  );
}

export default Index;
