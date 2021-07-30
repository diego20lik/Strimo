import React, { useEffect, useState, useRef } from "react";
import firebase from "../../../utils/firebase";
import blankImaage from "../../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { useAuth } from "../../context/authContext";
import { useHistory } from "react-router-dom";
import Err from "../../popup/err";
import Message from "../../popup/message";
import Loading from "../../loading";
import Progress from "../../popup/progress";
import "./subirVideo.css";
function Index() {
  const history = useHistory();
  const { currentUser, nickname } = useAuth();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [imageAsFile, setImageAsFile] = useState("");
  const [videoAsFile, setVideoAsFile] = useState("");
  const [videoAsUrl, setVideoAsUrl] = useState(allInputs);
  const [loading, setLoading] = useState();
  const [progress, setProgress] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const tituloRef = useRef();
  const descripcionRef = useRef();
  const [privatizar, setPrivatizar] = useState(false);
  const [NSFW, setNSFW] = useState(false);
  const time = firebase.firestore.Timestamp;
  //Imagen
  const handleImageAsFile = (e) => {
    if (!e.target.files[0].name.match(/.(jpg|jpeg|png|gif)$/i)) {
      e.target.value = null;
      setErr("El archivo no es una imagen");
      return false;
    }
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageAsUrl({ imgUrl: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };

  //Video
  const handlevideoAsFile = (e) => {
    if (!e.target.files[0].name.match(/.(mp4|mov|wmv|avi)$/i)) {
      e.target.value = null;
      setErr("El archivo no es un video");
      return false;
    }
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setVideoAsUrl({ imgUrl: e.target.result });
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    const image = e.target.files[0];
    setVideoAsFile((imageFile) => image);
  };
  const handleFireBaseUpload = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (videoAsFile === "") {
      setErr(
        `El archivo seleccionado no es una imagen, es: ${typeof videoAsFile}`
      );
      setLoading(false);
    }
    const uploadTask = storage
      .ref(
        `/users/${currentUser.uid}/videos/v${currentUser.uid}${time
          .now()
          .toMillis()}`
      )
      .put(videoAsFile);
    uploadTask.on("state_changed", (snapshot) => {
      console.log(snapshot.bytesTransferred / snapshot.totalBytes);
      setProgress(
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      );
    });
    uploadTask.then(async (doc) => {
      const videoUrl = await doc.ref.getDownloadURL();
      const uploadVideo = storage
        .ref(
          `/users/${currentUser.uid}/videos/i${currentUser.uid}${time
            .now()
            .toMillis()}`
        )
        .put(imageAsFile);
      uploadVideo.then(async (doc) => {
        const imageUrl = await doc.ref.getDownloadURL();
        await firebase
          .firestore()
          .collection("Videos")
          .add({
            video: videoUrl,
            img: imageUrl,
            titulo: tituloRef.current.value,
            descripcion: descripcionRef.current.value,
            privatizar: privatizar,
            fechaSubida: firebase.firestore.Timestamp.now(),
            NSFW: NSFW,
            de: nickname,
          })
          .then(async (concierto) => {
            await firebase
              .firestore()
              .collection("Chat")
              .add({
                video: concierto.id,
                integrantes: [],
              })
              .then(async (chat) => {
                await concierto.update({
                  chat: chat.id,
                });
              });
            setLoading(false);
            setMessage("Video Uploaded Correctly");
            setTimeout(() => {
              history.goBack();
            }, 2500);
          })
          .catch((err) => {
            setLoading(false);
            setErr(err.message);
          });
      });
    });
  };
  return (
    <>
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      {progress && <Progress message={progress} />}
      <div className="degradado form-container">
        <form className="form-media" onSubmit={handleFireBaseUpload}>
          <h1>Upload a video to your Space</h1>
          <div className=" my-3 w-100">
            <h4>Title</h4>
            <input
              className="w-100"
              type="text"
              placeholder="Title"
              ref={tituloRef}
              required
            />
            <h4 className="my-2">Description</h4>
            <textarea
              cols="40"
              rows="5"
              placeholder="Description"
              ref={descripcionRef}
              required
              className="w-100"
            />
          </div>
          <div className="w-100 row">
            <div className="col-md-12 d-flex flex-column justify-content-center align-items-center">
              <input
                type="checkbox"
                className="checkbox"
                name="privatizar"
                onChange={() => {
                  setPrivatizar(!privatizar);
                }}
              />
              <label for="invitar">
                <h5>Privatize Video</h5>
              </label>
            </div>
            {/* <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
              <input
                type="checkbox"
                className="checkbox"
                name="invitar"
                width="50px"
                onChange={() => {
                  setNSFW(!NSFW);
                }}
              />
              <label for="invitar">
                <h5>Hacer Video NSFW</h5>
              </label>
            </div> */}
          </div>
          <div className="file-form">
            <h4>Upload an Image for the Video</h4>
            {imageAsUrl.imgUrl == "" ? (
              <img src={blankImaage} width="200px" className="" />
            ) : (
              <img src={imageAsUrl.imgUrl} width="200px" />
            )}
            <input
              className="image-input mt-1"
              type="file"
              onChange={handleImageAsFile}
              required
            />
          </div>
          <div className="file-form">
            <h1>Upload your Video Here</h1>
            <input
              className="image-input"
              type="file"
              onChange={handlevideoAsFile}
              required
            />
          </div>
          <button className="primario">Upload Video</button>
        </form>
      </div>
    </>
  );
}

export default Index;
