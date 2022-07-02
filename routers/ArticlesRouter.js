const express = require('express')
const router = express.Router()
const ArticleTemplate = require('../models/ArticleModel')
router.post('/Ajout_articles', async (req,res)=>{
    try {
            
            const {Nom,images} = req.body;
            console.log(images)

            if(!images) return res.status(400).json({msg: "No image upload"})

            const article = await ArticleTemplate.findOne({Nom})
            if(article) return res.status(400).json({msg: "This article already exists."})

            const newArticle = new ArticleTemplate({Nom,images})

            await newArticle.save()
            res.json({msg: "Created a article"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
            
        }
})

router.get('/Liste_articles',async (req,res)=>{
    try {
            const articles = await ArticleTemplate.find()
            res.json(articles)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.put('/updateArticle/:id',async(req, res) =>{
        try {
            const {Nom,images} = req.body;
            await ArticleTemplate.findOneAndUpdate({_id: req.params.id}, {Nom,images})

            res.json({msg: "Updated an Article"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.delete('/deleteArticle/:id',async(req, res) =>{
        try {
            await ArticleTemplate.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted an Article"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })



module.exports = router