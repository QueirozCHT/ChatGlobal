
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAF9p1ChTzhUHelzo3arnfZ-080WgRGjOI",
  authDomain: "chatglob-c2943.firebaseapp.com",
  projectId: "chatglob-c2943",
  storageBucket: "chatglob-c2943.appspot.com",
  messagingSenderId: "154945494328",
  appId: "1:154945494328:web:0e3966ef004fcfe70b75cd",
  measurementId: "G-4E5RXHEVFK"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const databaseApp = getFirestore(app);