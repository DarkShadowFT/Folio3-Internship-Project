import connectToMongo from "../../../utils/db";
const sendinblue = require('./APISetup');


export default async function handler (req, res) {
  await connectToMongo()

  if (req.method === "POST") {
  // send email endpoint
    const { email } = req.body; //We will use this later
    let sendSmtpEmail = {
      to: [{
        email: email
      }],
      templateId: 1,
      params: {
        name: '',
        subject: '',
        text: '',
      },
    };
    sendinblue(sendSmtpEmail)
    return res.send('success');
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
}