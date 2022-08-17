import {Schema, model, models} from 'mongoose';

const DADSchema = new Schema({
  Doctor_ID: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  Day: {
    type: Date,
    required: true
  },
});

const DocAvailDay = models.Doc_Avail_Day || model('Doc_Avail_Day', DADSchema);
export default DocAvailDay
