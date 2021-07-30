import React, { useState, useRef } from "react";
import blankImaage from "../images/depositphotos_171453724-stock-illustration-default-avatar-profile-icon-grey.jpg";
import firebase from "../../utils/firebase";
import { useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Err from "../popup/err";
import Message from "../popup/message";
import Loading from "../loading";
function Index() {
  const history = useHistory();
  const { currentUser, nickname } = useAuth();
  const tituloRef = useRef();
  const precioRef = useRef();
  const storage = firebase.storage();
  const allInputs = { imgUrl: "" };
  const [loading, setLoading] = useState();
  const [err, setErr] = useState(false);
  const [message, setMessage] = useState(false);
  const [imageAsFile, setImageAsFile] = useState("");
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (imageAsFile === "") {
      setLoading(false);
      setErr(`not an image, the image file is a ${typeof imageAsFile}`);
      return;
    }
    const datosConciertos = {
      titulo: tituloRef.current.value,
      precio: precioRef.current.value,
      autor: nickname,
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
            setErr(e);
            setLoading(false);
          })
          .then((doc) => {
            setLoading(false);
            setMessage("File converted to NFT Updated Successully");
            setTimeout(() => {
              history.goBack();
            }, 2000);
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
      {err && <Err message={err} setErr={setErr} />}
      {message && <Message message={message} setMessage={setMessage} />}
      {loading && <Loading />}
      <div className="degradado fondo form-container">
        <div className="bubbles-background"></div>
        <form className="form-media" onSubmit={handleSubmit}>
          <h1 className="text-center">Upload your NFT!</h1>
          <div className=" my-2 w-100 container d-flex flex-column">
            <h4>Title</h4>
            <input
              className="image-input w-100 text-left mb-3"
              type="text"
              ref={tituloRef}
              placeholder="NFT Title"
              required
            />
            <div className="d-flex">
              <h4>Price</h4>
              <p>(ETH)</p>
            </div>
            <input
              type="number"
              min="0"
              step="any"
              ref={precioRef}
              placeholder="Price"
            />
          </div>
          <div className="file-form">
            <h4>Place your NFT here!</h4>
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
          <button className="primario">Create NFT</button>
        </form>
        {/* <img src={imageAsUrl.imgUrl} alt="image tag" /> */}
      </div>
    </>
  );
}

export default Index;
