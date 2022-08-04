const mongoose = require("mongoose");
const DASSchema = new mongoose.Schema({
  Availability_Day_ID: {
    type: Number,
    required: true,
  },
  Time_Slot: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Doctor_Availability_Slot", DASSchema);
