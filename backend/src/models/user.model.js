import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
     type : String,
     unique : [true , "username already exists"],
     required: true
    },
    email:{
        type : String,
     unique : [true , "account already exists with this email"],
     required: true
    },
    password:{
        type:String,
        required:true,

    }
})

const userModal = mongoose.model("user" , userSchema);
export default userModal;