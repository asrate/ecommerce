const express= require("express");
const router=express.Router();
const auth= require("../middleware/authorization")
const {check, validationResult}= require("express-validator");
const Product =require("../models/Product");

router.post("/",[auth,

    [check("name","name is required" ).not() .isEmpty(),
check("description","description is required" ).not() .isEmpty(),
check("catagory","catagory is required" ).not() .isEmpty(),
check("price","price is required" ).not() .isEmpty(),
check("quantity","quantity is required" ).not() .isEmpty(),
],],
async(req,res)=>{
     const errors= validationResult(req)
    
     if(!errors.isEmpty()){
         return res.status(400).json({errors:errors.array()})}
        try {
            console.log(req.body)
            console.log(req.user)
            const {name,description,catagory,price,brand,quantity}=req.body;
            const newProduct = new Product({
            userId:req.user.id,
            name,
            description,
            catagory,
            price,
            brand,
            quantity
          } );
          const product= await newProduct.save()
          res.json({product})
   
        } catch (error) {
            console.error(error.message)
            res.status(500).send("error message")
        }
    })
router.get("/",async(req,res)=>{
    try {
        const products=await Product.find()
        res.json(products)
    } catch (error) {
        conslose.error(error.message)
            res.status(500).send("error message")
        
    }
});

router.get("/:id",async(req,res)=>

{
    try {
        const product=await Product.findById(req.params.id)
        if(!product){
           return res.status(400).json({msg:"product is not found"})
        }
        res.json(product)
    } catch (error) {
        conslose.error(error.message)
            res.status(500).send("error message")
        
    }
});

module.exports= router