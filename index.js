const express=require('express')
const cors=require('cors')
const session = require('express-session')

const mongoose=require('mongoose')
const NotesRouter = require('./src/Routes/Notes.Routes')
const User = require('./src/Routes/Users.Routes')
// const cookieParser = require('cookie-parser')
const app=express()
const connection=mongoose.connect('mongodb+srv://marvel:marvelfan@cluster0.7678rp7.mongodb.net/users?retryWrites=true&w=majority')

// app.use(cookieParser())

app.use(express.json())
app.use(cors())

app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: false ,// Set to true if using HTTPS
      sameSite:'lax'
    }
  }))

app.use('/user',User)
app.use("/notes",NotesRouter)

app.listen(4500,async()=>{
    await connection
    console.log('Server is listening on 4500')
})


module.exports=app;