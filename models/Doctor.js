import { Schema, model, models } from 'mongoose';

const DoctorSchema = new Schema({
  Person_ID:{
    type:Schema.Types.ObjectId,
    required:true,
    unique:true,
    ref:'Person'
  },
  Specialization:{
    type:String,
    required:true
  },
  Degree_info:{
    type:String,
    required:true
  },
  Days_available:{
    type:Array,
    required:true
  },
  Slots_available:{
    type: Array,
    required: true,
  }
}, { collection: 'Doctor' })

const Doctor = models.Doctor || model('Doctor', DoctorSchema);
export default Doctor