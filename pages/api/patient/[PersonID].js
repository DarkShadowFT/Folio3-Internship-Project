import Patient from "../../../models/Patient"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "GET"){
    try {
      // Getting Doctor Name
      const {PersonID} = req.query;
      // console.log("Person ID = " + PersonID);
      const patient = await Patient.find({Person_ID: PersonID});
      if (patient[0]){
        return res.status(200).send(patient);
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