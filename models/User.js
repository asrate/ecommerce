const mongoose = require ("mongoose")
const userschema= new mongoose.Schema({
    name:{
    type : String,
    required: true,
},
   Email:{
    type: String,
    requred :true,
},
    password:{
    type: String,
    requred :true,
},
    role:{
    type : String,
    default:"custemer",

},
     date:{
         type:Date,
         default:Date.now(),
     },
});
  const user=mongoose.model("user",userschema)
  module.exports=user;