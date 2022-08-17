import Appointment from "../../models/Appointment"
import connectDb from "../../utils/db"


export default async function handler (req, res) {
  if (req.method === "POST") {
    console.log("appointment api called")
    let d = new Appointment({
      "Doctor_ID": req.body.Doctor_ID,
      "Patient_ID": req.body.Patient_ID,
      "Query": req.body.Query,
      "Date": req.body.Date,
      "Booking_Date": req.body.Booking_Date,
      "Fee": req.body.Fee,
      "Status": req.body.Status
    })
    await d.save()


    res.status(200).json({sucess: 'sucess'})
  }
  else if (req.method === "GET") {
    const ap = await Appointment.find();
    res.status(200).json(ap);

  }
  else {
    res.status(400).json({error: 'error'})
  }
}