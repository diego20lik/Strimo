importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js");
firebase.initializeApp({
  apiKey: "AIzaSyDVZBpImImjl5NUPjOeTxoXvybRXrUP2to",
  authDomain: "strimo-9e1a1.firebaseapp.com",
  projectId: "strimo-9e1a1",
  storageBucket: "strimo-9e1a1.appspot.com",
  messagingSenderId: "947032620004",
  appId: "1:947032620004:web:3c571845061d83670da5f1",
  measurementId: "G-MFM7MBW4B9",
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
