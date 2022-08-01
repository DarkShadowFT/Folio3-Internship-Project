import Doctor from "../../../models/Doctor"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();
  
  if (req.method == "POST"){
    try {
      const doctor = Doctor(req.body);
      await doctor.save();
      res.send(req.body);
    }
    catch (err){
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
};