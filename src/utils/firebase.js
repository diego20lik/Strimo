import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyDVZBpImImjl5NUPjOeTxoXvybRXrUP2to",
  authDomain: "strimo-9e1a1.firebaseapp.com",
  projectId: "strimo-9e1a1",
  storageBucket: "strimo-9e1a1.appspot.com",
  messagingSenderId: "947032620004",
  appId: "1:947032620004:web:3c571845061d83670da5f1",
  measurementId: "G-MFM7MBW4B9",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
// export const functions = firebase.functions();
export default firebase;
