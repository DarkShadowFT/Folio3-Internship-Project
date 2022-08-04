
import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Appointment.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


const handler= async (req,res)=>{
  if (req.method=="POST"){
    for(let i=0;i<req.body.length;i++){
      console.log(req.body)
      let d=new Doctor({
        "Doctor_ID":req.body[i].Doctor_ID,
        "Patient_ID":req.body[i].Patient_ID,
        "Query":req.body[i].Query,
        "Date":req.body[i].Date,
        "Booking_Date":req.body[i].Booking_Date,
        "Fee":req.body[i].Fee,
        "Status":req.body[i].Status

      })
      await d.save()
    }
    
    res.status(200).json({ sucess: 'sucess' })
  }
 
  else{
    res.status(400).json({ error: 'error' })
  }
}

export default connectDb(handler);