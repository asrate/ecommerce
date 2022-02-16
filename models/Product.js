const mongoose= require ("mongoose");
const Schema= mongoose.Schema
const ProductSchema=new Schema({
    userId:{
        type:Schema.Types.ObjectId,
        required:true,
    },
    name:{
        type :String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    catagory:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    brand:{
        type:String,
    },
    quantity:{
        type:Number,
        required:true,
    },
    created:{
        type:Date,
        default:Date.now,
    },
    update:{
        type:Date,
        default:Date.now,
    }

});
const Product=mongoose.model("Product", ProductSchema);
module.exports= Product

