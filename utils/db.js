const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://<admin>:<QmZLc10qCB6Y9FbZ>@cluster0.do9n7tn.mongodb.net/test";
const connectToMongo = () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection

  mongoose.connect(mongoURI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
module.exports = connectToMongo;
