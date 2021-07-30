import React, { useContext, useState, useEffect } from "react";
import firebase from "../../utils/firebase";
import { auth } from "../../utils/firebase";
import { useHistory } from "react-router-dom";
const AuthContext = React.createContext();
export function useAuth() {
  return useContext(AuthContext);
}
export function AuthProvider({ children }) {
  const history = useHistory();
  const [currentUser, setCurrentUser] = useState();
  const [role, setRole] = useState();
  const [nickname, setNickname] = useState();
  const [loading, setLoading] = useState(true);
  var provider = new firebase.auth.GoogleAuthProvider();
  const logIn = async (email, password) => {
    await auth.signInWithEmailAndPassword(email, password);
    history.push("/pre");
  };
  const signUpWithGoogle = async () => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(async (result) => {
        var user = result.user;
        history.go("/pre");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const signUp = async (email, password, displayName, nickname) => {
    const usuarios = firebase.firestore().collection("Usuarios")
    const verificarNickname =  firebase.functions().httpsCallable("verificarNickname")
    await verificarNickname(nickname).then(data=>{
      if(data==="invalid") throw "Nickname del usuario invalido"
      console.log(data)
    })
    return await auth
      .createUserWithEmailAndPassword(email, password)
      .then(async (user) => {
        if (user.user) {
          await user.user.updateProfile({
            displayName: displayName,
          }).then(async ()=>{
            await usuarios.add({
              user: user.user.displayName,
              nickname: nickname
            })
            alert("Se envio un Email de verificacion a tu correo.")
            history.push("/pre");
          })
        }
      });
  };
  const checkRole = (email) => {
    firebase
      .firestore()
      .collection("Usuarios")
      .where("user", "==", email)
      .get()
      .then((snap) => {
        snap.forEach((val) => {
          setRole(val.data().role);
        });
      });
  };
  const checkNickname = async (email)=>{
    await firebase
      .firestore()
      .collection("Usuarios")
      .where("user", "==", email)
      .onSnapshot((snap) => {
        snap.forEach((val) => {
          setNickname(val.data().nickname)
          setLoading(false)
        });
      });
  }
  const logOut = () => {
    history.push("/login");
    return auth.signOut();
  };
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user)
      if(user){
        checkRole(user.email);
        checkNickname(user.email)
      }else{
        setLoading(false)
      }
    });
    return unsubscribe;
  }, []);
  const value = {
    role,
    nickname,
    currentUser,
    signUpWithGoogle,
    logIn,
    logOut,
    signUp,
  };
  return (
    <AuthContext.Provider value={value}>
      {loading || children}
    </AuthContext.Provider>
  );
}
