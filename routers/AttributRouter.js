const express = require ('express');
const router = express.Router ();
const AttributTemplate = require ('../models/AttributModel');

router.post ('/Ajout_Attribut', async (req, res) => {
  try {
    const {Nom, serie} = req.body;
    const attributNom = await AttributTemplate.findOne ({Nom});
    const attributSousArticle = await AttributTemplate.findOne ({serie});
    if (attributNom && attributSousArticle)
      return res.status (400).json ({msg: 'This Attribut already exists.'});

    const newAttribut = new AttributTemplate ({Nom, serie});

    await newAttribut.save ();
    res.json ({msg: 'Created an Attribut'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.get ('/Liste_Attribut', async (req, res) => {
  try {
    const attribut = await AttributTemplate.find ();
    res.json (attribut);
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.put ('/update_Attribut/:id', async (req, res) => {
  try {
    const {Nom} = req.body;
    await AttributTemplate.findOneAndUpdate ({_id: req.params.id}, {Nom});

    res.json ({msg: 'Updated an attribut'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.delete ('/delete_Attribut/:id', async (req, res) => {
  try {
    await AttributTemplate.findByIdAndDelete (req.params.id);
    res.json ({msg: 'Deleted an attribut'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

module.exports = router;
