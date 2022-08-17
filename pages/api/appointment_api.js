
import Appointment from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Appointment.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


const handler= async (req,res)=>{
  if (req.method=="POST"){
    console.log("appointmennt api called")
    let d=new Appointment({
      "Doctor_ID":req.body.Doctor_ID,
      "Patient_ID":req.body.Patient_ID,
      "Query":req.body.Query,
      "Date":req.body.Date,
      "Booking_Date":req.body.Booking_Date,
      "Fee":req.body.Fee,
      "Status":req.body.Status

    })
    await d.save()
    
    
    res.status(200).json({ sucess: 'sucess' })
  }
  if (req.method=="GET"){
    const ap=await Appointment.find();
    res.status(200).json(ap);

  }  
    else{
    res.status(400).json({ error: 'error' })
  }
}

export default connectDb(handler);