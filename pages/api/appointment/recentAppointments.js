import Appointment from "../../../models/Appointment"
import Doctor from "../../../models/Doctor"
import Person from "../../../models/Person"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  try {
    await connectToMongo()

    if (req.method === "GET") {
      const appointments = await Appointment.find({}).limit(5).sort({Date: -1}).populate({
        path: 'Doctor_ID', model: 'Doctor',
        populate: {path: 'Person_ID', model: 'Person'}
      }).lean()
      return res.status(200).send(JSON.stringify(appointments))
    }
  }
  catch (err){
    console.error(err)
    return res.status(500).send("Internal server error occurred: " + err)
  }
};
