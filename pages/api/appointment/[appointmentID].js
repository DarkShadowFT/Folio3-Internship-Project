import Doctor from "../../../models/Doctor"
import Patient from "../../../models/Patient"
import Person from "../../../models/Person"
import Appointment from "../../../models/Appointment";
import connectToMongo from '../../../utils/db'

export default async (req, res) => {
  await connectToMongo();

  if (req.method === "GET"){
    try {
      // Getting Doctor Name
      const {appointmentID} = req.query;
      // console.log(appointmentID);
      const appointment = await Appointment.find({_id: appointmentID});
      if (appointment[0]){
        // console.log("appointment info: " + appointment + ", query: " + appointmentID);
        const patientID = appointment[0].Patient_ID
        // console.log("Patient ID = " + patientID)
        const doctorID = appointment[0].Doctor_ID

        //Getting Patient Info
        const patient = await Patient.find({_id: patientID});
        if (!patient[0]){
          return res.status(404).json("No patient found!");
        }
        // console.log("Patient details = " + JSON.stringify(patient))
        const patientInfo = await Person.find({_id: patient[0].Person_ID});
        // console.log("Patient personal details = " + JSON.stringify(patientInfo))
        const patientObj = {
          first_name: patientInfo[0].First_Name,
          last_name: patientInfo[0].Last_Name,
          patient_email: patientInfo[0].Email,
          doctor_email: "",
          doctor_name: "",
          doctor_specialization: "",
          appt_date: appointment[0].Date,
          appt_fee: appointment[0].Fee,
          appt_query: appointment[0].Query
        }

        // Getting Doctor Info
        const doctor = await Doctor.find({_id: doctorID});
        if (!doctor[0]){
          return res.status(404).json("No doctor found!");
        }
        patientObj.doctor_specialization = doctor[0].Specialization
        const doctorInfo = await Person.find({_id: doctor[0].Person_ID});
        patientObj.doctor_name = doctorInfo[0].First_Name + " " + doctorInfo[0].Last_Name
        patientObj.doctor_email = doctorInfo[0].Email
        // console.log("Sending object = " + JSON.stringify(patientObj))
        return res.status(200).send(patientObj);
      }
      else {
        return res.status(404).json("No appointment found!");
      }
    }
    catch (err){
      console.error(err);
      return res.status(500).json("Internal server error occurred");
    }
  }
  else {
    return res.status(501).json("Invalid API and/or method");
  }
};