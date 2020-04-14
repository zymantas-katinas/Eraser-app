// import { Router } from 'express';
// import auth from '../../middleware/auth';
// // Item Model
// import Artpiece from '../../models/artpiece.model';

// const router = Router();
const router = require('express').Router();
const Artpiece = require('../../models/artpiece.model');
const auth = require('../../middleware/auth');



router.get('/', async (req, res) => {
  try {
    const artpieces = await Artpiece.find();
    if (!artpieces) throw Error('No artpieces');

    res.status(200).json(artpieces);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});


router.post('/', auth, async (req, res) => {

  const newArtpiece = new Artpiece({
    username: req.body.username,
    title: req.body.title,
    uri: req.body.uri,
    duration: Number(req.body.duration),
  });

  try {
    const artpiece = await newArtpiece.save();
    if (!artpiece) throw Error('Something went wrong saving posting the Artpiece');

    res.status(200).json(artpiece);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

module.exports = router;