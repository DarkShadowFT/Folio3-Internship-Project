const mongoose= require('mongoose');
const AvailibitySlot_Schema= new mongoose.Schema({
    _id:Number,
   
    Time_Slot:{
        timestamps: true,
        required:true,
        unique:true
    },
    
});
module.exports=mongoose.model('AvailibilitySlot', AvailibilitySlot_Schema);