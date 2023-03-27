const {Router}=require("express")
const NotesModel  = require('../Models/Notes.Models')
const jwt=require('jsonwebtoken')
// const cookie=require('cookie-parser')

const NotesRouter=Router()

NotesRouter.get("/",async(req,res)=>{
    // console.log(req.session)
    // console.log(req.headers)
    try {
        const token=req.headers.authorization.split(" ")[1]
        const decoded=jwt.verify(token,'chotu')
        if(decoded){
            const notes=await NotesModel.find({"userID":decoded.userID})
            res.status(200).send(notes)
        }else{
            res.status(400).send({"msg":"Wrong Credentials"})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

NotesRouter.post('/addnotes',async(req,res)=>{
    try{
        const token=req.session.token
        const decoded=jwt.verify(token,'chotu')
        if(decoded){
            req.body.userID=decoded.userID
            const notes=await NotesModel.insertMany([req.body])
            res.status(200).send({"msg":"A New Note is Being Added!"})
        }else{
            res.status(400).send({"msg":"Please! Login"})
        }
    }catch(err){
        res.status(400).send({"msg":"Please! Login"})
    }
})

NotesRouter.delete('/delete/:noteID',async(req,res)=>{
    const id=req.params.noteID.slice(1)
    try {
        await NotesModel.findByIdAndDelete({"_id":id})
        res.status(200).send({"msg":"Note Deleted Successfully"})
    } catch (error) {
        res.status(400).send({"msg":error.message})   
    }
})

NotesRouter.patch("/update/:noteID",async(req,res)=>{
    const id=req.params.noteID.slice(1)
    try {
        await NotesModel.findByIdAndUpdate(id,req.body)
        res.status(200).send({"msg":"Note has been updated"})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports=NotesRouter