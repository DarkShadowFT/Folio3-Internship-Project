const mongoose = require("mongoose");
const AvailibitySlot_Schema = new mongoose.Schema({
  Time_Slot: {
    timestamps: true,
    required: true,
    unique: true,
  },
});
module.exports = mongoose.model("AvailibilitySlot", AvailibitySlot_Schema);
