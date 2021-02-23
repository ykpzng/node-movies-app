const express = require('express');
const router = express.Router();
//Model
const DirectorModel = require('../models/Director');


//POST ADD Director
router.post('/', (req, res) => {
  const director = new DirectorModel(req.body);

  director.save()
    .then((data) => { res.json(data) })
    .catch((err) => { res.json(err) })
})


//GET directors list
router.get('/', (req, res) => {
  DirectorModel.find()
    .then((data) => { res.json(data) })
    .catch((err) => { res.json(err) })
})


router.put('/updateall', function (req, res, next) {
  Post.updateMany({}, { bio: 'Marielle Heller is a writer, director and actor. She was selected as a 2012 Sundance Screenwriting Fellow and 2012 Sundance Directing Fellow, and was honored with the Lynn Auerbach Screenwriting Fellowship, and The Maryland Film Festival Fellowship. Her writing credits include pilots for ABC and 20th Century Fox, and multiple screenplays and' }, (error, data) => {
    if (error) {
      res.send("Beklenmeyen bir hatayla karşılaşıldı...");
    }
    else {
      res.json(data);
    }
  })
});



module.exports = router;