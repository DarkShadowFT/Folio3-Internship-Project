const mongoose = require('mongoose');

const Doctor = new mongoose.Schema({
  Person_ID:{
    type:Number,
    required:true,
    unique:true
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

module.exports = mongoose.model('Doctor', Doctor);