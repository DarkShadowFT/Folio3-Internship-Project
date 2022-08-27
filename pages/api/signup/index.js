import Patient from "../../../models/Patient"
import Person from "../../../models/Person"
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "POST") {
    try {
      const Person = Person(req.body);
      await Person.save()
      const patient = Patient({
        Person_ID: Person._id,  // assign the _id from the person
        BMI: req.body.BMI,
        Weight: req.body.Weight,
        Height: req.body.Height
      });

      await patient.save()
      return res.send(Person);
    }
    catch (err) {
      console.error(err);
      return res.status(500).send("Internal server error occurred");
    }
  }
  else 
  {
    return res.status(501).json("Invalid API and/or method");
  }
};