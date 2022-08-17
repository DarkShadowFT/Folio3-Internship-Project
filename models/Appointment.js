import { Schema, model, models } from 'mongoose';

const AppointmentSchema = new Schema({
  Doctor_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Doctor'
  },
  Patient_ID: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Patient'
  },
  Query: {
    type: String,
    required: true,
  },
  Date: {
    type: Date,
    timestamps: true,
    required: true
  },
  Booking_Date: {
    type: Date,
    timestamps: true,
    required: true
  },
  Fee: {
    type: Number,
    required: true
  },
  Status: {
    type: String,
    required: true,
  },
}, {collection: 'Appointment'});

const Appointment = models.Appointment || model('Appointment', AppointmentSchema);
export default Appointment
