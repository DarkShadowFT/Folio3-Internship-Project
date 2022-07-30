const express = require("express");
const Appointment = require("../models/Appointment");
const Patient = require("../models/Patient");
const Person = require("../models/Person");
const Doctor = require("../models/Doctor");
const router = express.Router();

// Mock data creator APIs
  router.post("/person", async (req, res) => {
    const person = Person(req.body);
    await person.save();
    res.send(req.body);
  });

  router.post("/patient", async (req, res) => {
    const patient = Patient(req.body);
    await patient.save();
    res.send(req.body);
  });

  router.post("/appointment", async (req, res) => {
    const appointment = Appointment(req.body);
    await appointment.save();
    res.send(req.body);
  });

  router.post("/doctor", async (req, res) => {
    const doctor = Doctor(req.body);
    await doctor.save();
    res.send(req.body);
  });
  
// Actual API for getting Appointment
router.get("/", async (req, res) => {
  try {
    const appointment = await Appointment.find({_id : req.query.ID});
    if (appointment.length){
      // console.log(appointment);
      
      // Getting Doctor Name
      const doctor = await Doctor.find({_id: appointment[0].Doctor_ID})
      // console.log("Doctor info: ", doctor);
      const personID = doctor[0].Person_ID
      // console.log("Finding " + personID + " in Person's table")
      const docInfo = await Person.find({_id: personID})
      // console.log("Doctor common info: ", docInfo);
      const docName = docInfo[0].First_Name + " " + docInfo[0].Last_Name;
      // console.log("Doctor Name: ", docName);
      
      const apptDate = appointment[0].Date;
      const bookingDate = appointment[0].Booking_Date;
      const fee = appointment[0].Fee;
      const status = appointment[0].Status;
      Appointment.find({}).sort('-date').limit(5).exec((err, docs) => { res.send(docs) });
      // res.send({docName, apptDate, bookingDate, fee, status});
    }
    else {
      res.status(404).send("No appointment found")
    }

  } 
  catch (err) {
    console.error(err);
  }
});

module.exports = router;
