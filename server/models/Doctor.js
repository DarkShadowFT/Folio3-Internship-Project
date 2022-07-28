const mongoose = require('mongoose');

const Doctor = new mongoose.Schema({
  Availability_Day_ID:{
    type: Number,
    required: true,
    unique: true
  },
  Date:{
    type: Date,
    default: Date.now
  },
  docotr_id:{
    type:Number,
    required:true,
    unique:true
  },
  person_id:{
    type:Number,
    required:true,
    unique:true
  },
  specializatioin:{
    type:String,
    required:true
  },
  degree_info:{
    type:String,
    required:true
  },
  days_available:{
    type:String,
    required:true
  },
  slot_available:{
    type: Number,
    required: true,
  }


})

module.exports = mongoose.model('Doctor', Doctor);