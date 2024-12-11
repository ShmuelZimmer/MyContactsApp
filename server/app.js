const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config()
const authRouter = require('./routes/authRoute')
const contactRouter = require('./routes/contactRoute')
const path = require('path')


const app = express()
mongoose.connect(
  process.env.MONGO_URI
)
.then(()=>{
    console.log("Connected to MongoDB")
})
.catch((err)=>{
    console.log(err)
})

if(process.env.NODE_ENV == "production"){
    app.use(express.static(path.join(__dirname, "..", "/client/dist")))
    app.get("*", (req, res) =>{
        res.sendFile(path.join(__dirname, "/client/dist/index.html"))
    })
}

app.use(cors())
app.use(express.json())
app.use("/auth", authRouter)
app.use("/contact", contactRouter) 


const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=>{
    console.log(`Connected on port ${PORT}`)
})