const express=require('express');
const Doctor = require('../models/Doctor');
const router=express.Router();

router.get('/',(req,res)=>{

    console.log(req.body);
    const doctor=Doctor(req.body);
    res.send(req.body);
    doctor.save()



})


module.exports=router