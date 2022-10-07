const mongoose=require("mongoose");
const Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    userImage:{
        type:String
    }
})
module.exports=mongoose.model("Foydalanuvchilar",Schema)