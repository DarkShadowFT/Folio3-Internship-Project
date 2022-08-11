import { Schema, model, models } from 'mongoose';
const mongoose = require('mongoose');

const mongoose = require("mongoose");
const AvailibitySlot_Schema = new mongoose.Schema({
  Time_Slot: {
    timestamps: true,
    required: true,
    unique: true,
  },
});
// module.exports = mongoose.model("AvailibilitySlot", AvailibitySlot_Schema);


const Test = models.AvailibilitySlot || model('AvailibilitySlot', AvailibitySlot_Schema);

export default Test;