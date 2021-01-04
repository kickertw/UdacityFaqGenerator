import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAX9CgsEGfkw97I--Bp_bx3BpkYfZwh6Ms",
  authDomain: "udacityfaqgenerator.firebaseapp.com",
  databaseURL: "https://udacityfaqgenerator-default-rtdb.firebaseio.com",
  projectId: "udacityfaqgenerator",
  storageBucket: "udacityfaqgenerator.appspot.com",
  messagingSenderId: "905790759617",
  appId: "1:905790759617:web:3a27c5bd48751d26c0ea40",
  measurementId: "G-P32NZ7L9BR"
});

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const db = firebaseApp.firestore();
