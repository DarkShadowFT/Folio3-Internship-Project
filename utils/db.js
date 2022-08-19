const mongoose = require("mongoose");
const MONGO_URI =
  "mongodb+srv://<admin>:<QmZLc10qCB6Y9FbZ>@cluster0.do9n7tn.mongodb.net/find-me-a-doctor";
const connectToMongo = () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection
  console.log("Monoose = " + mongoose.connections)
  mongoose.connect(MONGO_URI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
module.exports = connectToMongo;
