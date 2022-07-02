const express = require('express')
const router = express.Router()
const ProfilerTemplate = require('../models/profilerModel')


router.post('/Ajout_profiler', async (req, res) =>{
        try {
            
            const {reference,formule,attribut} = req.body;
            const ref = await ProfilerTemplate.findOne({reference})
            const att = await ProfilerTemplate.findOne({attribut})
            if(ref && att) return res.status(400).json({msg: "This profiler already exists."})

             
            const newProfiler = new ProfilerTemplate({reference,formule,attribut})

            await newProfiler.save()
            res.json({msg: "Created a profiler"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.get('/Liste_profiler',async (req,res)=>{
    try {
            const profiler = await ProfilerTemplate.find()
            res.json(profiler)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.put('/update_profiler/:id',async(req, res) =>{
        try {
            const {reference,formule} = req.body;
            await ProfilerTemplate.findOneAndUpdate({_id: req.params.id}, {reference,formule})

            res.json({msg: "Updated a profiler"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
})

router.delete('/delete_profiler/:id',async(req, res) =>{
        try {
            await ProfilerTemplate.findByIdAndDelete(req.params.id)
            res.json({msg: "Deleted an profiler"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    })

module.exports = router