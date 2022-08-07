import { Schema, model } from 'mongoose';

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
module.exports = model("Doctor_Availability_Slot", DASSchema);
