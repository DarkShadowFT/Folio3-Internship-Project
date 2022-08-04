const mongoose = require("mongoose");
const DADSchema = new mongoose.Schema({
  Doctor_ID: {
    type: Number,
    required: true,
  },
  Day: {
    type: Date,
    required: true
  },
});
module.exports = mongoose.model("Doc_Avail_Day", DADSchema);
