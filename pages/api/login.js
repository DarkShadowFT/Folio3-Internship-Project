import {adminAuth} from "../../utils/firebase-admin";

export default async function handler(req, res) {
  try {
    // console.log("headers = " + JSON.stringify(req.headers.authorization))
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

    const customToken = await adminAuth.createCustomToken(userId, additionalClaims)
    // console.log("Created custom token: " + customToken)
    const name = decodedToken.name;
    res.status(200).json({name: name, token: customToken})
  }
  catch(error){
    res.status(403).json(error)
  }
}
