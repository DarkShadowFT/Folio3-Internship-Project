import Doctor from "../../../models/Doctor"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "POST"){
    try {
      // Getting Doctor Name
      console.log(req.body);
      const specialization = req.body.searchQuery
      const regex = new RegExp(specialization, 'i') // i for case insensitive
      const doctor = await Doctor.find({Specialization: {$regex: regex}});
      if (doctor[0]){
        // console.log("Doctor info: " + doctor + ", query: " + doctorID);
        return res.status(200).send(doctor);
      }
      else {
        return res.status(404).json("No Doctor found!");
      }
    }
    catch (err){
      console.error(err);
      return res.status(500).json("Internal server error occurred");
    }
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
};