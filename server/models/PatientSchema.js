const mongoose= require('mongoose');
const patient_schema= new mongoose.Schema({
    Patient_ID:{
        type:number,
        required:true,
        unique:true
    },
    Person_ID:{
        type:number,
        required:true,
        unique:true
    },
    BMI:{
        type:number,
        required:true,
        unique:false
    },
    Weight:{
        type:number,
        required:true,
        unique:false
    },
    Height:{
        type:number,
        required:true,
        unique:false
    },
});
module.exports=mongoose.model('Patient', patient_schema);