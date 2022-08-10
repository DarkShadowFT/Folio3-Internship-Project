
// import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doctor_Availability_Slot.js"
// import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


// const handler= async (req,res)=>{
//   if (req.method=="POST"){
//     for(let i=0;i<req.body.length;i++){
//       console.log(req.body)
//       let d=new Doctor({
//         "Availability_Day_ID":req.body[i].Availability_Day_ID,
//         "Time_Slot":req.body[i].Time_Slot,

//       })
//       await d.save()
//     }
    
//     res.status(200).json({ sucess: 'sucess' })
//   }
 
//   else{
//     res.status(400).json({ error: 'error' })
//   }
// }

// export default connectDb(handler);















import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doctor_Availability_Slot.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"


const handler= async (req,res)=>{
  if (req.method=="POST"){
    for(let i=0;i<req.body.length;i++){
      console.log(req.body)
      let d=new Doctor({
        "Availability_Day_ID":req.body[i].Availability_Day_ID,
        "Time_Slot":req.body[i].Time_Slot,

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












