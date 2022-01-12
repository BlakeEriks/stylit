// Import the functions you need from the SDKs you need
import Firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// const {
//   FIREBASE_APIKEY, 
//   FIREBASE_AUTHDOMAIN,
//   FIREBASE_PROJECTID,
//   FIREBASE_STORAGEBUCKET,
//   FIREBASE_MESSAGINGSENDERID,
//   FIREBASE_APPID
// } = process.env

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA6GglMcyjseDPMcElW1Us4MeA5oTZQfJU",
  authDomain: "stylit-f71cd.firebaseapp.com",
  projectId: "stylit-f71cd",
  storageBucket: "stylit-f71cd.appspot.com",
  messagingSenderId: "527311009437",
  appId: "1:527311009437:web:86cc2543e7da0a37714674"
};

// if a Firebase instance doesn't exist, create one
if (!Firebase.apps.length) {
  Firebase.initializeApp(firebaseConfig)
}

export default Firebase