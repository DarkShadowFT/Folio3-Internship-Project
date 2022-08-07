import {Schema, model} from 'mongoose'

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
module.exports = model("History", HistorySchema);
