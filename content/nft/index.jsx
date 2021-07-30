import React, { useState, useRef } from "react";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
function Index() {
  const history = useHistory();
  const { currentUser } = useAuth();
  const tituloRef = useRef();
  const precioRef = useRef();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  //   const storage = firebase.storage();
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageAsFile === "") {
      console.error(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }
    const datosConciertos = {
      titulo: tituloRef.current.value,
      precio: precioRef.current.value,
    };
    await storage
      .ref(`/NFT/${currentUser.uid}/${currentUser.uid}-${imageAsFile.name}`)
      .put(imageAsFile)
      .then(async (image) => {
        const imageUrl = await image.ref.getDownloadURL();
        await firebase
          .firestore()
          .collection("NFT")
          .add({
            ...datosConciertos,
            img: imageUrl,
          })
          .catch((e) => {
            console.log(e);
          })
          .then((doc) => {
            console.log(doc.id);
            history.goBack();
          });
      });
  };

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
  return (
    <>
      <div className="degradado fondo">
        <form className="form-perfil" onSubmit={handleSubmit}>
          <h1 className="text-center">Llena el formulario para Subir el NFT</h1>
          <div className=" my-2 w-100 container d-flex flex-column">
            <h4>Título</h4>
            <input
              className="image-input w-100 text-left mb-3"
              type="text"
              ref={tituloRef}
              placeholder="Título del concierto"
              required
            />
            <div className="d-flex">
              <h4>Precio</h4>
              <p>(ETH)</p>
            </div>
            <input
              type="number"
              min="0"
              step="any"
              ref={precioRef}
              placeholder="Precio"
            />
          </div>
          <div className="file-form">
            <h4>Coloca el NFT aca</h4>
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
          <button className="primario">Crear NFT</button>
        </form>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
      </div>
    </>
  );
}

export default Index;
