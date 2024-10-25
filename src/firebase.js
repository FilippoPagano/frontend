// src/firebase.js
import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC-OQFh6eSSaT4eYsmTrGuPl4rlUmXfzFI",
    authDomain: "pingpong-elo.firebaseapp.com",
    projectId: "pingpong-elo",
    storageBucket: "pingpong-elo.appspot.com",
    messagingSenderId: "265334349296",
    appId: "1:265334349296:web:3384b7a6d387aacffa5135",
    measurementId: "G-WV8L2S19P0"
  };
  
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
