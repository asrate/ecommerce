const express= require("express")
const router=express.Router()
const bcrypt =require ("bcryptjs")
const {check, validationResult}= require("express-validator");
const User = require('../models/User');
const jwt= require("jsonwebtoken")
const config=require ('../config/key')

router.get("/",(req,res)=>res.send("user route"))


router.post("/",
[check("name","name is required" ).not() .isEmpty(),
check("Email","please enter the valid email") .isEmail(),
check("password","please enter atleast 5 character") .isLength({min:5})],

async(req,res)=>{
    const errors=validationResult(req)
    if(!errors.isEmpty())
    return res.status(400).json({errors:errors.array()})
    try {
       
       const {name,Email,password}=req.body
       let user=await User.findOne({Email:Email})
       if(user){
           console.log(user)
           return res.status(400).json({errors:[{msg:"user alread exit"}]})
       }
       user= new User({
        name,
        Email,
        password,
       });
       const salt=await bcrypt.genSalt(10)
       user.password=await bcrypt.hash(password, salt)
       user.save();
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
    
     module.exports=router