import firebase from "firebase";

const config = {
  apiKey: "AIzaSyAU5TmzVieeumkOqb2oFM-Ww3_uLO8mVkw",
  authDomain: "teachertool-ed3a5.firebaseapp.com",
  databaseURL: "https://teachertool-ed3a5.firebaseio.com",
  projectId: "teachertool-ed3a5",
  storageBucket: "teachertool-ed3a5.appspot.com",
  messagingSenderId: "546452077302",
  appId: "1:546452077302:web:3ce7caa0114711adf84ad7",
  measurementId: "G-D640J9Z28J",
};

// Initialize Firebase
firebase.initializeApp(config);
firebase.analytics();

export default firebase;
