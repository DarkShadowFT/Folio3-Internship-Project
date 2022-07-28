const mongoose= require('mongoose');
const patient_schema= new mongoose.Schema({
    _id: Number,
    Patient_ID:{

        required:true,
        unique:true
    },
    Person_ID:{
        
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
module.exports=mongoose.model('Patiaent', patient_schema);