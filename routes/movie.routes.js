const express = require('express');
const router = express.Router();
//Model
const MovieModel = require('../models/Movie');


//GET
router.get('/', (req, res) => {
  res.send('GET request to the movie page')
})

//POST
router.post('/', function (req, res) {
  const movie = new MovieModel(req.body);    // Bu yöntem tüm verileri eşleştirir

  movie.save((err, data) => {
    if (err) res.json(err)
    res.json(data)
  });
})





module.exports = router;