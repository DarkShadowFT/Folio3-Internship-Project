const mongoose = require("mongoose");
const MONGO_URI = process.env.MONGO_URI;
const connectToMongo = () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  // console.log("Monoose = " + mongoose.connections)
  mongoose.connect(MONGO_URI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
module.exports = connectToMongo;
