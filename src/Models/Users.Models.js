const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String,
    },
    age:{
        type:Number,
    }
},{
    versionKey:false
})


const UserModel=mongoose.model('user',userSchema)

module.exports=UserModel