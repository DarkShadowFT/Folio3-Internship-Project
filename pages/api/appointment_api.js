import Appointment from "../../models/Appointment"
import connectToMongo from '../../utils/db'


export default async function handler (req, res) {
  await connectToMongo()

  if (req.method === "POST") {
    const appointment = Appointment({
      "Doctor_ID": req.body.Doctor_ID,
      "Patient_ID": req.body.Patient_ID,
      "Query": req.body.Query,
      "Date": req.body.Date,
      "Booking_Date": req.body.Booking_Date,
      "Fee": req.body.Fee,
      "Status": req.body.Status
    })
    await appointment.save()
    return res.status(200).json(appointment)
  }
  else if (req.method === "GET") {
    const ap = await Appointment.find();
    return res.status(200).json(ap);
  }
  else if (req.method === "PUT"){

    const newAppointment = {
      "Doctor_ID": req.body.Doctor_ID,
      "Patient_ID": req.body.Patient_ID,
      "Query": req.body.Query,
      "Date": req.body.Date,
      "Booking_Date": req.body.Booking_Date,
      "Fee": req.body.Fee,
      "Status": req.body.Status
    }
    // console.log("Appointment id = " + req.body.app_id)
    const appointment = await Appointment.findByIdAndUpdate(req.body.app_id, {$set: newAppointment})
    return res.status(200).json({appointment})
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
}