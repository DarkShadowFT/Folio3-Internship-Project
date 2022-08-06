import {adminAuth} from "../../../utils/firebase-admin";

export default async function handler(req, res) {
  try {
    //   console.log("headers = " + JSON.stringify(req))
    const idToken = req.headers['authorization']
    // console.log("idToken = " + idToken)
    const decodedToken = await adminAuth.verifyIdToken(idToken)
    // console.log("Decoded token: " + JSON.stringify(decodedToken))
    if (!decodedToken.bookingFormView)
      res.status(403).json("Not Authorized")
    // console.log("Created custom token: " + customToken)
    res.status(200).json("Authorized")
  }
  catch(error){
    res.status(403).json(error)
  }
}