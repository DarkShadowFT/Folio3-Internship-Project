import Patient from "../../models/Patient"
import PersonSchema from "../../models/Person"
import connectToMongo from '../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "POST") {
    try {
      const Person = PersonSchema(req.body);

      Person.save(function (err) {
        const patient = new Patient({
          Person_ID: Person._id,  // assign the _id from the person
          BMI: "30",
          Weight: "20",
          Height: "6"


        });

        patient.save(function (err) {
        });
      });


      res.send(Person);
    }
    catch (err) {
      console.error(err);
      res.status(500).send("Internal server error occurred");
    }
  }
};