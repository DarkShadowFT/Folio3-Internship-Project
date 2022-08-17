import Doctor from "../../../models/Doctor"
import Person from "../../../models/Person";
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "POST"){
    try {
      // Getting Doctor Name
      const email = req.body.email
      // console.log("Email = " + email)
      const person = await Person.find({Email: email})
      if (person[0]){
        const doctor = await Doctor.find({Person_ID: person[0]._id});
        if (doctor[0]){
          // console.log("Doctor info: " + doctor + ", query: " + doctorID);
          return res.status(200).send(doctor);
        }
        else {
          return res.status(404).json("No Doctor found!");
        }
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