const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json())




app.use("/api/doctor",require("./routes/doctor_route"));

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});





app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
