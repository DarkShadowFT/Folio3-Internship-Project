import {adminAuth} from "../../../utils/firebase-admin";

export default async function handler(req, res) {
  // console.log("API called with ", req.method)
  try {
    if (req.method === 'GET'){
      // console.log("headers = " + JSON.stringify(req))
      const idToken = req.headers['authorization']
      // console.log("idToken = " + idToken)
      const decodedToken = await adminAuth.verifyIdToken(idToken)
      // console.log("Decoded token: " + decodedToken)
      const userId = decodedToken.uid
      const additionalClaims = {
        dashboardView: true,
        docListView: true,
        docListSearch: true,
        docListChooseDoctor: true,
        bookingFormView: true,
        bookingFormSubmit: true,
        appointmentsListView: true,
        appointmentCreate: true,
        appointmentView: true,
        appointmentEdit: true,
        appointmentDelete: true,
      };
      // console.log("Additional claims created with uid = ", userId)
      let customToken
      try {
        customToken = await adminAuth.createCustomToken(userId, additionalClaims)
      }
      catch(err){
        console.error(err)
      }
      // console.log("Created custom token: " + customToken)
      const name = decodedToken.name;
      return res.status(200).json({name: name, token: customToken})
    }
  }
  catch(error){
    return res.status(403).json(error)
  }
}
