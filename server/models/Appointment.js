const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
    Appointment_ID:{
      type: Number,
      required: true,
      unique: true
    },
    Doctor_ID:{
      type: Number,
      require: true,
      unique: true
    },
    Patient_ID:{
      type: Number,
      required: true,
      unique: true
    },
    Query:{
      type: String,
      required: true,
    },
    Date:{
      type: Date,
      timestamps: true
    },
    Status:{
      type: String,
      required: true
    },

})

module.exports = mongoose.model('appointment', AppointmentSchema);