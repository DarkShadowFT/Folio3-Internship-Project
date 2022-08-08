const mongoose = require("mongoose");
//import person from "../../models/Person"
const patient_schema = new mongoose.Schema({
  Person_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  
  BMI: {
    type: Number,
    required: true,
    unique: false,
  },
  Weight: {
    type: Number,
    required: true,
    unique: false,
  },
  Height: {
    type: Number,
    required: true,
    unique: false,
  },
  //person: [{ type: Schema.Types.ObjectId, ref: 'person' }]
});
module.exports = mongoose.model("Patient", patient_schema);
