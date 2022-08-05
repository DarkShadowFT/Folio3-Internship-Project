
import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doctor.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"



export default async function addTest(req, res) {
  try {
    console.log('CONNECTING TO MONGO');
    await connectMongo();
    console.log('CONNECTED TO MONGO');

    console.log('CREATING DOCUMENT');
    const test = await Test.create(req.body);
    console.log('CREATED DOCUMENT');

    res.json({ test });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
}



// console.log("Yes this is called")
// alert("Yes this is called")

// const handler= async (req,res)=>{

//   console.log("Yes this is called")

//   if (req.method=="POST"){
//     console.log("Yes this is called")
//     for(let i=0;i<req.body.length;i++){
//       console.log(req.body)

//       let d=new Doctor({
//         //"Person_ID":req.body[i].Person_ID,
//         "Specialization":req.body[i].Specialization,
//         // "Degree_info":req.body[i].Degree_info,
//         // "Days_available":req.body[i].Days_available,
//         // "Slots_available":req.body[i].Slots_available
//       })
//       console.log(d)
//       await d.save()
//     }
    
//     res.status(200).json({ sucess: 'sucess' })
//   }
 
//   else{
//     res.status(400).json({ error: 'error' })
//   }
// }

// export default connectDb(handler);