import Appointment from "../../../models/Appointment"
import connectToMongo from "../../../utils/db"

export default async (req, res) => {
  try {
    await connectToMongo()

    const current_year = new Date().getFullYear();
    const least_year = current_year - 6
    if (req.method === "GET") {
      const appointments = await Appointment.aggregate([
        {
          $match: {
            Date: {
              $gte: new Date(`${least_year}-01-01`),
              $lte: new Date(`${current_year}-12-31`),
            },
          },
        },
        {
          $group: {
            _id:
              {
                date: {$year: "$Date"},
                status: "$Status"
              },
            count:
              {$sum: 1}
          }
        },
        {
          $sort:
            {
              _id: 1
            }
        }
      ]);
      return res.send(JSON.stringify(appointments))
    }
  } catch (err) {
    console.error(err)
    return res.status(500).send("Internal server error occurred")
  }
}
