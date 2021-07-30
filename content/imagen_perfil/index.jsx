import React, { useEffect, useState } from "react";
import firebase from "../../utils/firebase";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import { useAuth } from "../context/authContext";
import "./imagen-perfil.css";
import { useHistory } from "react-router-dom";
import Err from "../popup/err"
import Message from "../popup/message"
import Loading from "../loading"
function Index() {
  const history = useHistory();
  const { currentUser, nickname } = useAuth();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  useEffect(() => {
    storage
      .ref(`users/${currentUser.uid}/pfp/`)
      .child(`pfp${currentUser.uid}`)
      .getDownloadURL()
      .then((fireBaseUrl) => {
        setImageAsUrl((prevObject) => ({
          ...prevObject,
          imgUrl: fireBaseUrl,
        }));
      });
  }, []);
  const handleImageAsFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (e) => {
        setImageAsUrl({ imgUrl: e.target.result });
        console.log(imageAsUrl);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
    const image = e.target.files[0];
    setImageAsFile((imageFile) => image);
  };
  const handleFireBaseUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (imageAsFile === "") {
      setErr(`El archivo seleccionado no es una imagen, es: ${typeof imageAsFile}`);
      setLoading(false)
    }
    const uploadTask = storage
      .ref(`/users/${currentUser.uid}/pfp/pfp${currentUser.uid}`)
      .put(imageAsFile);
    uploadTask.then((doc) => {
        firebase.firestore().collection("Usuarios").where("nickname", "==", nickname).get().then(snap=>{
          snap.docs.map(async user=>{
            const url = await doc.ref.getDownloadURL()
            user.ref.update({
              pfp: url
            })
          })
        }).then(()=>{
          setLoading(false)
          setMessage("Foto actualizada correctamente")
          setTimeout(()=>{
            history.goBack();
          }, 2500)
        }).catch(err=>{
          setErr(err);
          setLoading(false)
        })
    }).catch(err=>{
      setErr(err);
      setLoading(false)
    })
  };
  return (
    <>
      {err&&<Err message={err} setErr={setErr}/>}
      {message&&<Message message={message} setMessage={setMessage}/>}
      {loading&&<Loading/>}
      <div className="degradado fondo">
        <form className="form-perfil" onSubmit={handleFireBaseUpload}>
          <h1>Carga una imagen de perfil!</h1>
          <div className="file-form">
            {imageAsUrl.imgUrl == "" ? (
              <img
                src={blankImaage}
                width="100px"
                className="profile-image-viewer"
              />
            ) : (
              <img src={imageAsUrl.imgUrl} className="profile-image-viewer" />
            )}
            <input
              className="image-input"
              type="file"
              onChange={handleImageAsFile}
              required
            />
          </div>
          <button className="primario">Subir Imagen</button>
        </form>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
      </div>
    </>
  );
}

export default Index;
