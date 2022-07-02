const mongoose = require('mongoose')

const sousArticleSchema = new mongoose.Schema({

    Nom:{
        type : String,
        required : true,
        trim: true,
        unique: true,
        sparse:true
    },

    article :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ArticleSchema',
        required:true
    }

})

module.exports = mongoose.model('sousArticles',sousArticleSchema)