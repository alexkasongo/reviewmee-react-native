// database/firebaseDb.js

// import firebase from "firebase/app";
import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyA6D4YPfnPY9NymQBh_WSUrFphR27qx9Eg",
  authDomain: "consentmee.firebaseapp.com",
  projectId: "consentmee",
  storageBucket: "consentmee.appspot.com",
  messagingSenderId: "341422949639",
  appId: "1:341422949639:web:b0b3cf4e9279c0394fb1a2",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
