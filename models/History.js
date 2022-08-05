const mongoose = require("mongoose");
const HistorySchema = new Schema({
  Patient_ID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Appointment_ID: {
    type: Schema.Types.ObjectId,
    required: true
  },
});
module.exports = mongoose.model("History", HistorySchema);
