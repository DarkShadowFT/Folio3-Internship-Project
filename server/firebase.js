import { getAuth, signInWithCustomToken } from "firebase/auth";
import { initializeApp } from 'firebase-admin/app';
var admin = require("firebase-admin");

var serviceAccount = require("find-me-a-doctor-dev-firebase-adminsdk-vvbm7-aac8e5333b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

function createCustomToken(uid){
  getAuth()
  .createCustomToken(uid)
  .then((customToken) => {
    
  })
  .catch((error) => {
    console.log('Error creating custom token:', error);
  });
}

function verifyToken(idToken){
  // idToken comes from the client app
  getAuth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    // ...
  })
  .catch((error) => {
    // Handle error
  });
}