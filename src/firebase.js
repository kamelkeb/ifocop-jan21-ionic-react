import firebase from "firebase/app";
import "firebase/auth";



const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
