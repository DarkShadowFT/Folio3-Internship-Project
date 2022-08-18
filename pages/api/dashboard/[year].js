import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  try {
    await connectToMongo()

    const {year} = req.query;
    let formatted_date = year + '-' + '01' + '-' + '01';
    // console.log("formatted_date = " + formatted_date)
    const current_year = new Date(formatted_date);
    let formatted_year = parseInt(year)
    formatted_year += 1
    formatted_date = formatted_year + '-' + '01' + '-' + '01';
    const next_year = new Date(formatted_date);
    // console.log("current year = " + current_year + ", \nnext year = " + next_year);
    if (req.method === "GET") {
      const appointments = await Appointment.find({
        Booking_Date: {
          $gte: current_year,
          $lt: next_year,
        },
      }).sort({Booking_Date: 1});
      return res.send(JSON.stringify(appointments))
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send("Internal server error occurred")
  }
}
