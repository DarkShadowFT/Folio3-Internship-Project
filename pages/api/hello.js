// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { SwipeVerticalSharp } from "@mui/icons-material";
import { Query } from "mongoose";

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}




// export default function get_something(req, res) {
//   const {method}=req;
//   switch(method){
//     case'GET':
//     try{
//       const query= await Query

//     }catch(err){
//       res.status(500).json(err)
//     }
//       //res.status(200).json({method:'GET',endpoint:'appointments'})

//   }
// }
