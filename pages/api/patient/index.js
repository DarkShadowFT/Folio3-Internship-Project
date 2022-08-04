import Patient from "../../../models/Patient"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();
  
  if (req.method == "POST"){
    try {
      const patient = Patient(req.body);
      await patient.save();
      res.send(req.body);
    }
    catch (err){
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
};