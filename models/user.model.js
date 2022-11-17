const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    name : {
        type: String,
        unique: true,
        required: [true, 'name is required'],
    },  
    email:{
        type: String,
        unique: true,
        required: [true, 'email is required'],
        lowercase: true
    },
    age:{
        type: Number,
        required: [true, 'age is required'],
        max: 120,
        min: 8,
    },
    sex: {
        type: String,
        enum: ['man' , 'woman'],
        lowercase: true,
    },
    createdAt:{
        type : Date,
        default : Date.now()
    }

})

module.exports = mongoose.model('User', Schema)