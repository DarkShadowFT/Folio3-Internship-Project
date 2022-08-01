const mongoose = require("mongoose");
const DADSchema = new Schema({
  Doctor_ID: {
    type: String,
    required: true,
  },
  Day: {
    type: Date,
    required: true
  },
});
module.exports = mongoose.model("Doc_Avail_Day", DADSchema);
