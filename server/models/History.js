const mongoose = require("mongoose");
const HistorySchema = new Schema({
  Patient_ID: {
    type: Number,
    required: true,
  },
  Appointment_ID: {
    type: Number,
    required: true
  },
}, {collection: 'History'});
module.exports = mongoose.model("History", HistorySchema);
