const mongoose = require('mongoose');

const AppointmentSchema = new mongoose.Schema({
  Availability_Day_ID:{
    type: Number,
    required: true,
    unique: true
  },
  Date:{
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('availability_day', Availability_DaySchema);