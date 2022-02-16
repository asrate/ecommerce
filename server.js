const express = require("express")
const app=express();
const connectDB= require("./config/db");
const PORT = process.env.PORT||5000
 connectDB()
 app.use(express.json({extended:false}))
 app.use("/api/users", require("./routes/userApi"))
 app.use("/api/product", require("./routes/productApi"))
 app.use("/api/auth", require("./routes/authApi"))
app.get("/", (req,res)=>{
    res.send("my app is up")
})
app.listen(PORT,()=>{
    console.log(`server is listening at port ${PORT}`)
})
