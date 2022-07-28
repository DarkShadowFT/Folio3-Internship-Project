const mongoose= require('mongoose');
const AvailibitySlot_Schema= new mongoose.Schema({
    Availibility_slot_ID:{
        _id:Number,
        required:true,
        unique:true
    },
    Time_Slot:{
        timestamps: true,
        required:true,
        unique:true
    },
    
});
module.exports=mongoose.model('AvailibilitySlot', AvailibilitySlot_Schema);