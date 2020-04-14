const router = require('express').Router();
const Artpiece = require('../../models/artpiece.model');

router.route('/').get((req, res) => {
  Artpiece.find()
    .then(artpieces => res.json(artpieces))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const title = req.body.title;
  const uri = req.body.uri;
  const duration = Number(req.body.duration);

  const newArtpiece = new Artpiece({
    username,
    title,
    uri,
    duration,
  });

  newArtpiece.save()
  .then(() => res.json('Artpiece added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Artpiece.findById(req.params.id)
    .then(artpiece => res.json(artpiece))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Artpiece.findByIdAndDelete(req.params.id)
    .then(() => res.json('Artpiece deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  Artpiece.findById(req.params.id)
    .then(artpiece => {
      artpiece.username = req.body.username;
      artpiece.title = req.body.title;
      artpiece.duration = Number(req.body.duration);
      artpiece.date = Date.parse(req.body.date);

      artpiece.save()
        .then(() => res.json('Artpiece updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;