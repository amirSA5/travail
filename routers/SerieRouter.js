const express = require ('express');
const router = express.Router ();
const serieTemplate = require ('../models/SerieModel');

router.post ('/Ajout_serie', async (req, res) => {
  try {
    const {Nom, sousArticle} = req.body;
    const serieNom = await serieTemplate.findOne ({Nom});
    const attributSousArticle = await serieTemplate.findOne ({sousArticle});
    if (serieNom && attributSousArticle)
      return res.status (400).json ({msg: 'This Attribut already exists.'});

    const newSerie = new serieTemplate ({Nom, sousArticle});

    await newSerie.save ();
    res.json ({msg: 'Created serie'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.get ('/Liste_serie', async (req, res) => {
  try {
    const serie = await serieTemplate.find ();
    res.json (serie);
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.put ('/update_serie/:id', async (req, res) => {
  try {
    const {Nom} = req.body;
    await serieTemplate.findOneAndUpdate ({_id: req.params.id}, {Nom});

    res.json ({msg: 'Updated serie'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

router.delete ('/delete_serie/:id', async (req, res) => {
  try {
    await serieTemplate.findByIdAndDelete (req.params.id);
    res.json ({msg: 'Deleted serie'});
  } catch (err) {
    return res.status (500).json ({msg: err.message});
  }
});

module.exports = router;
