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
  else if (req.method === "DELETE"){
   
    // Getting Doctor Name
    const {appID} = req.query;
    const deletedappointment = await Appointment.find(
      (app) => app._id ===parseInt(appID)
    )
    const index=Appointment.findById(
      (app) => app._id ===parseInt(appID)
    )
    Appointment.splice(index,1)
      res.status(200).json(deletedappointment)
  }
};