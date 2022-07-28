const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});

// available routes for appointment and availability days
app.get('/api/appointment', require('./routes/appointment'))
app.get('/api/availability_day', require('./routes/availability_day'))


app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
