const express = require('express')
const router = express.Router()
const sousArticleTemplate = require('../models/SousArticleModel')



router.post('/Ajout_sousArticle', async (req, res) =>{
        try {
            
            const {Nom,article} = req.body;
            const sousArticle = await sousArticleTemplate.findOne({Nom})
            if(sousArticle) return res.status(400).json({msg: "This sousArticle already exists."})

             
            const newSousArticle = new sousArticleTemplate({Nom,article})

            await newSousArticle.save()
            res.json({msg: "Created a sousArticle"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.get('/Liste_sousArticle',async (req,res)=>{
    try {
            const sousArticles = await sousArticleTemplate.find()
            res.json(sousArticles)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.put('/update_sousArticle/:id',async(req, res) =>{
        try {
            const {Nom} = req.body;
            await sousArticleTemplate.findOneAndUpdate({_id: req.params.id}, {Nom})

            res.json({msg: "Updated a sousArticle"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.delete('/delete_sousArticle/:id',async(req, res) =>{
        try {
            await sousArticleTemplate.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted an sousArticle"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })

module.exports = router