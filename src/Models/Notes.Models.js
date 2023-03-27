const mongoose=require('mongoose')

const notesSchema=new mongoose.Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    subject:{
        type:String,
    },
    userID:{
        type:String,
    }
},{
    versionKey:false
})

const NotesModel=mongoose.model('note',notesSchema)

module.exports=NotesModel