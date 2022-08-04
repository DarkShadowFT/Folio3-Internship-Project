
import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doc_Avail_Day.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


const handler= async (req,res)=>{
  if (req.method=="POST"){
    for(let i=0;i<req.body.length;i++){
      console.log(req.body)
      let d=new Doctor({
        "Doctor_ID":req.body[i].Doctor_ID,
        "Day":req.body[i].Day
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