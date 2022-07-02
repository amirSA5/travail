const mongoose = require('mongoose')

const ArticleSchema = new mongoose.Schema({

    Nom:{
        type : String,
        required : true,
        trim: true,
        unique: true,
        sparse:true
    },
    images:{
        type: Object,
        required: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Articles',ArticleSchema)