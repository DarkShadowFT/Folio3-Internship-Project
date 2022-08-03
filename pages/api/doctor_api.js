
import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doctor.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


const handler= async (req,res)=>{
  if (req.method=="POST"){
    for(let i=0;i<req.body.length;i++){
      console.log(req.body)
      let d=new Doctor({
        "Person_ID":req.body[i].Person_ID,
        "Specialization":req.body[i].Specialization,
        "Degree_info":req.body[i].Degree_info,
        "Days_available":req.body[i].Days_available,
        "Slots_available":req.body[i].Slots_available
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