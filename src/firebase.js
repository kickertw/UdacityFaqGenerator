import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "***REMOVED***",
  authDomain: "udacityfaqgenerator.firebaseapp.com",
  databaseURL: "***REMOVED***",
  projectId: "udacityfaqgenerator",
  storageBucket: "***REMOVED***",
  messagingSenderId: "***REMOVED***",
  appId: "1:***REMOVED***:web:3a27c5bd48751d26c0ea40",
  measurementId: "***REMOVED***"
});

export const auth = firebaseApp.auth();
export const firestore = firebaseApp.firestore();
export const db = firebaseApp.firestore();
