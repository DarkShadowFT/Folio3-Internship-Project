import Appointment from "../../../models/Appointment"
import Doctor from "../../../models/Doctor"
import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();
  
  if (req.method === "POST"){
    try {
      const appointment = Appointment(req.body);
      await appointment.save();
      return res.send(req.body);
    }
    catch (err){
      console.error(err);
      return res.status(500).send("Internal server error occurred");
    }
  }
  else if (req.method === "DELETE"){
    const {appID} = req.body;
    let index=parseInt(appID)
    const deletedappointment= await Appointment.findOneAndDelete(index)
    
    if (Array.isArray(Appointment)) {
      Appointment.splice(index,1)
    }
    
    console.log(deletedappointment);
    return res.status(200).json(deletedappointment)
  }
  else if (req.method === "GET") {
    const appointments = await Appointment.find({}).select('Date Query').populate({
      path: 'Doctor_ID', model: 'Doctor', select: 'Person_ID -_id',
      populate: {path: 'Person_ID', model: 'Person', select: 'First_Name Last_Name -_id'}
    }).lean()
    return res.status(200).send(JSON.stringify(appointments))
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
};