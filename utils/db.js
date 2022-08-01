import mongoose from "mongoose";
const connectToMongo = () => {
  if (mongoose.connections[0].readyState) return;
  // Using new database connection

  mongoose.connect(process.env.MONGO_URI, () => {
    console.log("Connected to Mongo Successfully");
  });
};
module.exports = connectToMongo;
