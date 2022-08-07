import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  try {
    await connectToMongo()

    const {year} = req.query;
    let formatted_date = year + '-' + '01' + '-' + '01';
    // console.log("formatted_date = " + formatted_date)
    const current_year = new Date(formatted_date);
    formatted_date = (year + 1) + '-' + '01' + '-' + '01';
    const next_year = new Date(formatted_date);
    // console.log("current month = " + current_month + ", \nnext month = " + next_month);
    if (req.method === "GET") {
      const appointments = await Appointment.find({
        Booking_Date: {
          $gte: current_year,
          $lt: next_year,
        },
      }).sort({Booking_Date: 1});
      res.send(JSON.stringify(appointments))
    }
  } catch (err) {
    console.error(err)
    res.status(500).send("Internal server error occurred")
  }
}
