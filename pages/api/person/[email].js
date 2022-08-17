import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "GET"){
    try {
      // Getting Doctor Name
      const {email} = req.query;
      // console.log(email);
      const person = await Person.find({Email: email});
      if (person[0]){
        return res.status(200).send(person);
      }
      else {
        return res.status(404).json("No person found!");
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