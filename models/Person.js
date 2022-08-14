import { Schema, model, models } from 'mongoose';

const PersonSchema = new Schema({
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Address: {
    type: String,
  },
  Email: {
    type: String,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  Gender: {
    type: Boolean,
    required: true,
  },
  Phone_Number: {
    type: String,
    required: true,
  },
  CNIC: {
    type: String,
    required: true,
  },
 
  
 
}, {collection: 'Person'} );
const person = models.person || model('person', PersonSchema);
export default person;
