import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
});

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const db = firebaseApp.firestore();
