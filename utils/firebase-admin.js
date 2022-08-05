import { getAuth } from "firebase/auth";

var admin = require("firebase-admin");
var serviceAccount = require("find-me-a-doctor-dev-firebase-adminsdk-vvbm7-aac8e5333b.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

export function verifyToken(idToken){
  // idToken comes from the client app
  getAuth()
  .verifyIdToken(idToken)
  .then((decodedToken) => {
    // ...
  })
  .catch((error) => {
    console.error(error);
  });
}