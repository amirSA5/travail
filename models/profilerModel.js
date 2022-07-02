const mongoose = require('mongoose')


const profilerSchema = new mongoose.Schema({

    reference:{
        type : String,
        required : true,
        unique : true,
    },

    formule :{
        type : String,
        required : true,
        default:'sans formule'
    },

    attribut:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'sousArticleSchema'
    }
})

module.exports = mongoose.model('Profiler',profilerSchema)