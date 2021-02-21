const express = require('express');
const router = express.Router();
//Model
const MovieModel = require('../models/Movie');


//GET ALL MOVIES
router.get('/', (req, res) => {
  MovieModel.find({})
    .then(data => { res.json(data) })
    .catch(err => { res.json(err) })
})

//GET A MOVIE
router.get('/:movieId', (req, res, next) => {
  MovieModel.findById(req.params.movieId)
    .then(data => {
      if (data == null) {
        next({ message: "The movie was not found.", code: 99 })
      }
      res.json(data)
    })
    .catch(err => {
      next({ message: "The movie was not found.", code: 99 })
      res.json(err)
    })
})


//POST  ADD MOVIE
router.post('/', function (req, res) {

  /*  const movie = new MovieModel({
     title : req.body.title,
     imdb_score:req.body.imdb_score,
     category:req.body.category,
     country:req.body.country,
     year:req.body.year
 }) */

  const movie = new MovieModel(req.body);    // Bu yöntem tüm verileri eşleştirir. Üstekine göre daha kolay

  // movie.save((err, data) => {
  //   if (err) res.json(err)
  //   res.json(data)
  // });

  // Eğer promise ile kullanırsak bu şekilde
  movie.save()
    .then((data) => { res.json(data) })
    .catch((err) => { res.json(err) });
})





module.exports = router;