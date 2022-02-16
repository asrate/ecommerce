const express= require("express");
const res = require("express/lib/response");
const router=express.Router();
const auth = require("../middleware/authorization");
const User = require("../models/User");
const jwt= require("jsonwebtoken")
const config=require ('../config/key')
const bcrypt =require ("bcryptjs")
const {check, validationResult}= require("express-validator");

router.get("/", auth, async(req,res)=>{
try {
   console.log=(req.user) 
   const user= await User.findById(req.user.id).select("-password")
   console.log(user)
   res.json(user)
} catch (error) {
    console.error(error.message)
}
})

router.post("/",
[
check("Email","please enter the valid email") .isEmail(),
check("password","password is requied") .exists()],

async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.array()})
    try {
       
       const {Email,password}=req.body
       let user=await User.findOne({Email:Email})
       if(!user){
       // console.log(user)
           return res.status(400).json({errors:[{msg:"Invalid username or password"}]})
       }
      const match= await bcrypt.compare(password, user.password)
      if(!match){
        
        return res.status(400).json({errors:[{msg:"Invalid username or password"}]})
      }
       const payload={
           user:{
              id:user.id,
            }
       }
       jwt.sign(
           payload,
        config.jwtSecret,
        {expiresIn:3600*24},
       (err, token)=>{
           if(err) throw err;
           res.json({token})
       }
       )
       // res.send("user created");
    } catch (error) {
        res.status(500).send("server error")
        console.error(error)
    }

})
module.exports= router