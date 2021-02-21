const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:40
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    stock:{
        type:Number,
    },
    sold:{
        type:Number,
        default:0
    },
    price:{
        type:Number,
        required:true
    },
    category:{
        type:ObjectId,
        ref:"Category",
        required:true
    },
    photo:{
        //just for the demonstration purpose, usually we don't store images in the databases.
        // images are stored separately on the server like S3 bucket in aws
        type:Buffer,
        contentType:String
    }
},{timestamps:true});

module.exports = mongoose.model("Product", productSchema);