const {Router}=require('express')
const UserModel = require('../Models/Users.Models')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')
const User=Router()

User.post('/register',(req,res)=>{
    try {
        bcrypt.hash(req.body.password, 4, async(err, hash)=> {
            req.body.password=hash;
            await UserModel.insertMany([req.body])
            res.status(200).send({"msg":"Account Added Successfully"})
        });
        
    } catch (error) {
        res.status(401).send({"msg":error.message})
    }
})

User.post('/login',async(req,res)=>{
     const {email,password}=req.body
    console.log()
     try {
        const user=await UserModel.findOne({email})
        if(user){
            const token=jwt.sign({"userID":user._id},'chotu')
            bcrypt.compare(password,user.password,(err,result)=>{
                if(result){
                    // console.log(req.session.token)
                    if(req.session.token===undefined){
                        req.session.token=token
                        req.session.save()
                    }
                    console.log(req.session.token)
                    res.status(200).send({"msg":"Login Successful","token":token})
                }else{
                    req.session.cookie.token=null;
                    res.status(400).send({"msg":"Wrong Credentials"})
                }
            })
        }
     } catch (error) {
        res.status(400).send({"msg":error.message})
     }
})

module.exports=User






