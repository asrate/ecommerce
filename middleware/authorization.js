
const jwt= require("jsonwebtoken")
const config=require ('../config/key')
module.exports=function(req,res,next)
{
    const token=req.header("x-auth-token");
    if(!token){
        res.status(401).json({msg:"you dont have right authorization"})
    }
    try {
        const decode =jwt.verify(token, config.jwtSecret)
        req.user=decode.user
        next();
     
 } catch (error) {
     res.status(401).json({msg:"invalid Token"})
     
 }
    

};

   