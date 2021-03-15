import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBlxaNZosa7ABbZ8A6vUiApHf9cX6-ME4o",
  authDomain: "yoga-app-1244a.firebaseapp.com",
  projectId: "yoga-app-1244a",
  appId: "1:798784300428:web:238a67cc105b9c5c50a2a9",
  measurementId: "G-PJ2ZCT4CE8"
};
firebase.initializeApp(firebaseConfig);

export default firebase;