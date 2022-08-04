import Doctor from "../../../models/Doctor"
import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "GET"){
    try {
      // Getting Doctor Name
      const {doctorID} = req.query;
      const doctor = await Doctor.find({_id: doctorID});
      if (doctor[0]){
        // console.log("Doctor info: " + doctor + ", query: " + doctorID);
        const personID = doctor[0].Person_ID
        // console.log("Finding " + personID + " in Person's table")
        const docInfo = await Person.find({_id: personID});
        // console.log("Doctor common info: ", docInfo);
        const name = docInfo[0].First_Name + " " + docInfo[0].Last_Name;
        // console.log("Doctor Name: ", docName);
        res.status(200).send(JSON.stringify(name));
      }
      else {
        res.status(404).json("No Doctor found!");
      }
    }
    catch (err){
      console.error(err);
      res.status(500).json("Internal server error occurred");
    }
  }
};