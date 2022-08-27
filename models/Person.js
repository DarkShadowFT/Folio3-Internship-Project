import { Schema, model, models } from 'mongoose';

const PersonSchema = new Schema({
  UID: {
    type: String,
    unique: true
  },
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
    unique: true
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
    unique: true
  },
}, {collection: 'Person'} );
const Person = models.Person || model('Person', PersonSchema);
export default Person;
