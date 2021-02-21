const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1');

let userSchema = new mongoose.Schema( {
    name:{
        type:String,
        required:true,
        trim:true,
        maxlength:40
    },email:{
        type:String,
        required:true,
        trim:true,
        unique:true
    },contact:{
        type:Number,
        required:true,
        unique:true
    },user_info:{
        type:String,
        trim:true
    },encrypted_password:{
        type:String,
        required:true
    },salt:String,
    role:{
        type:Number,
        default:0
    },purchases:{
        type:Array,
        default:[]
    }
},{timestamps:true});
userSchema.virtual("password")
    .set(function(password){
        this._password=password;
        this.salt=uuidv1();
        this.encrypted_password=this.securePassword(password);
    })
    .get(function(){
        return this._password;
    });
userSchema.methods={
    authenticate: function(plainpassword){
        return this.securePassword(plainpassword)===this.encrypted_password;
    },
    securePassword:function(plainpassword){
        if(!plainpassword) return "";
        try {
            return crypto.createHmac("sha256",this.salt)
            .update(plainpassword)
            .digest("hex");
        } catch (error) { return "";
            
        }
    }
}
module.exports = mongoose.model('User',userSchema);