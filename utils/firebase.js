// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJcPwEzfSP1V7atoK3-nWzg38yy3WOOxQ",
  authDomain: "find-me-a-doctor-dev.firebaseapp.com",
  projectId: "find-me-a-doctor-dev",
  storageBucket: "find-me-a-doctor-dev.appspot.com",
  messagingSenderId: "293626469940",
  appId: "1:293626469940:web:59152084384af542d13461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
