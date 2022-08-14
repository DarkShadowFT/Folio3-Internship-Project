
import { Schema, model, models } from 'mongoose';
const patient_schema = new  Schema({
  Person_ID: {
    type: Schema.Types.ObjectId,
    required:true,
    unique:true,
    ref:'Person'
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

}, {collection: 'Patient'});

const Patient = models.Patient || model('Patient', patient_schema);
export default Patient;
