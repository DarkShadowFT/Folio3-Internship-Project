const mongoose = require('mongoose');

const Availability_DaySchema = new mongoose.Schema({
  Day:{
    type: Date,
    default: Date.now
  },
})

module.exports = mongoose.model('availability_day', Availability_DaySchema);