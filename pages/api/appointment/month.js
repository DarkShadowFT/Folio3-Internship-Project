import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  await connectToMongo()

  const date = new Date();
  const year = 2021;
  const month = 10;
  let formatted_date = year + '-' + month + '-' + '01';
  // console.log("formatted_date = " + formatted_date)
  const current_month = new Date(formatted_date);
  formatted_date = year + '-' + (month + 1) + '-' + '01';
  const next_month = new Date(formatted_date);
  // console.log("current month = " + current_month + ", \nnext month = " + next_month);

  if (req.method === "GET") {
    try {
      const appointments = await Appointment.find({
        Date: {
          $gte: current_month,
          $lt: next_month,
        },
      });
      return res.send(JSON.stringify(appointments))
    }
    catch (err){
      console.error(err)
      return res.status(500).send("Internal server error occurred")
    }
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
}
