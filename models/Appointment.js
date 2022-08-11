
import { Schema, model, models } from 'mongoose';
const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  Doctor_ID: {
    type: Number,
    required: true,
  },
  Patient_ID: {
    type: Number,
    required: true,
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
  }
});

//module.exports = mongoose.model("appointment", AppointmentSchema);

const Test = models.Appointment || model('Appointment', AppointmentSchema);

export default Test;

