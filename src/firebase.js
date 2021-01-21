import firebase from "firebase/app";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCaNFNNdWGJhSC2iXi4yAVcc5vCbk4xFqE",
  authDomain: "rbschedulesback.firebaseapp.com",
  databaseURL: "https://rbschedulesback.firebaseio.com",
  projectId: "rbschedulesback",
  storageBucket: "rbschedulesback.appspot.com",
  messagingSenderId: "231007648139",
  appId: "1:231007648139:web:1515ac5c73aa9f9ddb578e",
  measurementId: "G-YLSBLXGBXC",
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
