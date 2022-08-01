const mongoose = require("mongoose");
const DASSchema = new Schema({
  Availability_Day_ID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Time_Slot: {
    type: String,
    required: true,
  },
});
module.exports = mongoose.model("Doctor_Availability_Slot", DASSchema);
