const connectToMongo = require("./db");
const express = require("express");
connectToMongo();

const PORT = process.env.PORT || 3001;

const app = express();

var cors = require('cors')
app.use(cors())

app.use(express.json())

app.use("/api/dashboard", require("./routes/Dashboard"))
app.get("/api", (req, res) => {
  res.json({message: "Hello from server!"});
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
