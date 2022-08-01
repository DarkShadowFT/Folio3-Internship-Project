// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBJcPwEzfSP1V7atoK3-nWzg38yy3WOOxQ",
  authDomain: "find-me-a-doctor-dev.firebaseapp.com",
  projectId: "find-me-a-doctor-dev.appspot.com",
  storageBucket: "find-me-a-doctor-dev.appspot.com",
  messagingSenderId: "293626469940",
  appId: "1:293626469940:web:fff575be8ba3f64cd13461"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
