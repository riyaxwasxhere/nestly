import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "nestly-9ba7e.firebaseapp.com",
  projectId: "nestly-9ba7e",
  storageBucket: "nestly-9ba7e.appspot.com",
  messagingSenderId: "801266480325",
  appId: "1:801266480325:web:fa480752a90269175d6cac"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth} 