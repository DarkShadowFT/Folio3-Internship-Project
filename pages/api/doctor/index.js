import Doctor from "../../../models/Doctor"
import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();
  
  if (req.method === "POST"){
    try {
      const doctor = Doctor(req.body);
      await doctor.save();
      return res.send(req.body);
    }
    catch (err){
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
  else if (req.method === "GET"){
    try {
      const doctors = await Doctor.find({}).populate('Person_ID').lean();
      return res.status(200).send(JSON.stringify(doctors))
    }
    catch (err){
      console.error(err)
      res.status(404).send("No doctor found")
    }
  }
};