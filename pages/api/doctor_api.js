
import Doctor from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\models\\Doctor.js"
import connectDb from "D:\\Work\\Folio 3 Project\\Folio3-Internship-Project\\mongoose.js"



// export default async function addTest(req, res) {
//   try {
//     console.log('CONNECTING TO MONGO');
//     await connectMongo();
//     console.log('CONNECTED TO MONGO');

//     console.log('CREATING DOCUMENT');
//     const test = await Test.create(req.body);
//     console.log('CREATED DOCUMENT');

//     res.json({ test });
//   } catch (error) {
//     console.log(error);
//     res.json({ error });
//   }
// }



console.log("Yes this is called out")


const handler= async (req,res)=>{

  console.log("Yes this is called middle")

  if (req.method=="POST"){
    console.log("Yes this is called in")
    //for(let i=0;i<req.body.length;i++){
      // console.log("Yes this is called innner")
      // console.log(req.body)

      let d=new Doctor({
        "Person_ID":req.body.Person_ID,
        "Specialization":req.body.Specialization,
        "Degree_info":req.body.Degree_info,
        "Days_available":req.body.Days_available,
        "Slots_available":req.body.Slots_available,

      })
      //console.log("end")
      //console.log(d)

      await d.save()
    //}
    
    res.status(200).json({ sucess: 'sucess electric' })
  }
  // if (req.method=="GET"){
  //   const d=await Doctor.find();
  //   res.status(200).json(d);

  // }  
  else{
    res.status(400).json({ error: 'error' })
  }
}

export default connectDb(handler);