import React, { useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { useAuth } from "../context/authContext";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import verificado from "../images/VERIFICADO.png";
import expirado from "../images/EXPIRADO.png";
function Confirmar() {
  const history = useHistory();
  const { id } = useParams();
  const [match, setMatch] = useState(false);
  const { currentUser } = useAuth();
  const time = firebase.firestore.Timestamp.now().toMillis();
  const invitacionDoc = firebase.firestore().collection("Invitacion");
  const addToChat = firebase.firestore().collection("Chat");
  const pago = firebase.firestore().collection("Pagos");
  const [invitacionId, setInvitacionId] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    invitacionDoc
      .where("tiempo", "==", parseInt(id))
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          if (
            doc.data() &&
            !doc.data().usuarioInvitado &&
            doc.data().tiempo > time
          ) {
            doc.ref.update({ usuarioInvitado: currentUser.email });
            try {
              pago.doc(doc.data().pago).get().then(snap=>{
                addToChat.where("concierto", "==", snap.data().concierto).get().then(chatData =>{
                  chatData.docs.map(chat=>{
                    chat.ref.update({
                      integrantes: firebase.firestore.FieldValue.arrayUnion(currentUser.email)
                    })
                  })
                })
                snap.ref.update({
                  usuario: firebase.firestore.FieldValue.arrayUnion(currentUser.uid)
                })
              })
              setInvitacionId(doc.data().concierto);
            } catch {
              alert("Algo salio mal");
            }
            setMatch(true);
          }
          setLoading(false);
        });
      });
  }, []);
  return (
    <>
      {loading ||
        (match ? (
          <Confirmado history={history} chatId={invitacionId} />
        ) : (
          <Invalido />
        ))}
    </>
  );
}
const Confirmado = ({ history, chatId }) => {
  return (
    <>
      <div className="fondo">
        <div className="caja-link-confir">
          <img src={verificado} alt="" width="100px" />
          <h2>Haz sido invitado/a a ver el concierto de "Nombre"!</h2>
          <h3>El concierto será a las "Hora"</h3>
          <p>El link es solo valido para ti, no se puede volver a utilizar</p>
          <button
            className="primario"
            style={{ width: "fit-content" }}
            onClick={() => history.push(`/video/${chatId}`)}
          >
            Ir al concierto
          </button>
        </div>
      </div>
    </>
  );
};
const Invalido = () => {
  return (
    <>
      <div className="fondo">
        <div className="caja-link-confir">
          <img src={expirado} alt="" width="100px" />
          <h2>Link inválido</h2>
          <h3>
            El link puede ser inválido porque está mal escrito o porque caduco
          </h3>
          <p>Para más información contáctanos por los canales disponibles</p>
        </div>
      </div>
    </>
  );
};
export default Confirmar;
