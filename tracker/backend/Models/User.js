const mongoose=require('mongoose');
const Schema=mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
});
const userModel=mongoose.model('users',UserSchema);
module.exports=UserModel;