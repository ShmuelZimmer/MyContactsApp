const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type:String,
        required:true,
        minLength: 2
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        minLength: 5,
        required: true
    },
    contacts:[{
        id: String,
        name: String,
        number: String
    }]
    
})

module.exports = mongoose.model("users", userSchema) 
