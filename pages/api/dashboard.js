import Appointment from "../../models/Appointment"
import connectToMongo from '../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === 'GET') {
    try {
      Appointment.find({}).sort('-date').limit(5).exec((err, docs) => { res.json(docs) });
      // const appointment = await Appointment.find({_id : req.query.ID});
      // if (appointment.length){
      //   // console.log(appointment);
      
      //   const apptDate = appointment[0].Date;
      //   const bookingDate = appointment[0].Booking_Date;
      //   const fee = appointment[0].Fee;
      //   const status = appointment[0].Status;
      //   // res.send({docName, apptDate, bookingDate, fee, status});
      // }
      // else {
      //   res.status(404).send("No appointment found")
      // }
    } 
    catch (err) {
      console.error(err);
      res.status(500);
    }
  }
};