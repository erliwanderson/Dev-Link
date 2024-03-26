import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBmtbQSr2rUsxaqyipG-_Wn1UGZUk2J54s",
  authDomain: "reactlinks-556b4.firebaseapp.com",
  projectId: "reactlinks-556b4",
  storageBucket: "reactlinks-556b4.appspot.com",
  messagingSenderId: "293698888885",
  appId: "1:293698888885:web:39a3d666fc18db94f70afc",
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
