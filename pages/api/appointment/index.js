import Appointment from "../../../models/Appointment"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();
  
  if (req.method == "POST"){
    try {
      const appointment = Appointment(req.body);
      await appointment.save();
      res.send(req.body);
    }
    catch (err){
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
};