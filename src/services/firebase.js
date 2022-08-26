import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBMuUiSIvDwddGSXQssL8C_0YDCxQm1UTk",
  authDomain: "reactjs-vincit.firebaseapp.com",
  projectId: "reactjs-vincit",
  storageBucket: "reactjs-vincit.appspot.com",
  messagingSenderId: "512832100460",
  appId: "1:512832100460:web:05fd8b90f7543c1a5ca049"
};

const app = initializeApp(firebaseConfig);
const firestoreDB = getFirestore(app);

export default firestoreDB;