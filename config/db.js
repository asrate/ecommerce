const mongoose =require ("mongoose")
const config = require("./key")
console.log(config)
const db= config.mongoURI;


console.log(db)
const connectDB =async () =>{
    try{
        await mongoose.connect(db,{
            useNewUrlParser: true, 
            useUnifiedTopology: true,
        });console.log("connect to database")
    } catch(err){
        console.log(err)
        process.exit(1)
    }
}
module.exports=connectDB;