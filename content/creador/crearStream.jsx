import React, { useRef, useState } from "react";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Message from "../popup/message"
import Loading from "../loading"
import Err from "../popup/err"
function CrearStream() {
  const { currentUser } = useAuth();
  const history = useHistory();
  const tituloRef = useRef();
  const descripcionRef = useRef();
  const diaRef = useRef();
  const horaRef = useRef();
  const duracionRef = useRef();
  const allInputs = { imgUrl: "" };
  const storage = firebase.storage();
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
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

  //On Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }
    const datosConciertos = {
      artista: currentUser.displayName,
      entradasVip: 200,
      estatus: "pendiente",
      envivo: null,
      espectadores: null,
      nombreBasico: currentUser.displayName.replace(/\s+/g, "").toLowerCase(),
      titulo: tituloRef.current.value,
      descripcion: descripcionRef.current.value,
      fecha: diaRef.current.value,
      hora: horaRef.current.value,
      duracion: duracionRef.current.value,
    };
    await storage
      .ref(`/conciertos/${currentUser.uid}/${imageAsFile.name}`)
      .put(imageAsFile)
      .then(async (image) => {
        const imageUrl = await image.ref.getDownloadURL();
        await firebase
          .firestore()
          .collection("Conciertos")
          .add({
            ...datosConciertos,
            img: imageUrl,
          })
          .catch((e) => {
            setErr(e.message)
            setLoading(false)
          })
          .then(async (doc) => {
            await firebase.firestore().collection("Notificaciones").add({
              info: "Se hizo la peticion de un nuevo concierto correctamente!",
              infoHeadLine: "Peticion procesada",
              tiempo: firebase.firestore.Timestamp.now().toDate(),
              usuario: currentUser.uid,
              visto: false,
            }).then(()=>{              
              setMessage("Proceso completado correctamente");
              setTimeout(()=>history.goBack(), 3000)
              setLoading(false)
            })
          });
      });
  };
  return (
    <>
      {err&&<Err message={err} setErr={setErr}/>}
      {message&&<Message message={message} setMessage={setMessage}/>}
      {loading&&<Loading/>}
      <div className="degradado fondo">
        <form className="form-perfil" onSubmit={handleSubmit}>
          <h1 className="text-center">
            Llena el formulario para crear el concierto
          </h1>
          <div className=" my-5 w-100 container d-flex justify-content-center align-items-center flex-column">
            <input
              className="image-input w-100 text-left mb-5"
              type="text"
              ref={tituloRef}
              placeholder="Título del concierto"
              required
            />
            <textarea
              ref={descripcionRef}
              cols="40"
              rows="5"
              placeholder="Descripción"
              required
              className="w-100"
            />
          </div>
          <div className="row w-100 d-flex justify-content-center align-items-center mb-5">
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
              <h4>Día del concierto</h4>
              <input type="date" ref={diaRef} required className="mb-4" />
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
              <h4>Hora del concierto</h4>
              <input type="time" ref={horaRef} required className="mb-4" />
            </div>
            <div className="col-md-6 d-flex justify-content-center align-items-center flex-column">
              <h4>Duración (en horas)</h4>
              <input
                type="number"
                min="0"
                ref={duracionRef}
                placeholder="Duracion"
              />
            </div>
          </div>
          <div className="file-form">
            <h4>Coloca una foto para el concierto</h4>
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
          <button className="primario">Crea Concierto</button>
        </form>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
      </div>
    </>
  );
}

export default CrearStream;
