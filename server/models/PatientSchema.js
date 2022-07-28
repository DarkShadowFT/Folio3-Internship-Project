const mongoose= require('mongoose');
const patient_schema= new mongoose.Schema({
    _id: Number,
   
    Person_ID:{
        type:Number,
        required:true,
        unique:true
    },
    BMI:{
        type:Number,
        required:true,
        unique:false
    },
    Weight:{
        type:Number,
        required:true,
        unique:false
    },
    Height:{
        type:Number,
        required:true,
        unique:false
    },
});
module.exports=mongoose.model('Patient', patient_schema);