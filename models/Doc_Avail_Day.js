import { Schema, model } from 'mongoose';

const DADSchema = new Schema({
  Doctor_ID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Day: {
    type: Date,
    required: true
  },
});
module.exports = model("Doc_Avail_Day", DADSchema);
