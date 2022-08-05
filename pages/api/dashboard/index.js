import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  await connectToMongo()

  if (req.method === "GET") {
    try {
      const appointments = await Appointment.find({}).sort("-date").limit(5)
      res.status(200).send(JSON.stringify(appointments))
    }
    catch (err){
      console.error(err)
      res.status(500).send("Internal server error occurred")
    }
  }
};
