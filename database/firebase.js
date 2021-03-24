// database/firebaseDb.js

import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyBHfgkBIO3wtx__IpVua5R-56T2DAqMzLY",
  authDomain: "constentmee.firebaseapp.com",
  projectId: "constentmee",
  storageBucket: "constentmee.appspot.com",
  messagingSenderId: "255894554269",
  appId: "1:255894554269:web:20f7dbdd06eb93827b7674",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
