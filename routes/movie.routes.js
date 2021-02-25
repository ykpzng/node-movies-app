const express = require('express');
const router = express.Router();
//Model
const MovieModel = require('../models/Movie');


//!----------------------------------------------------------
//GET ALL MOVIES
//http://localhost:3000/api/movies
router.get('/', (req, res) => {
  MovieModel.find({})
    .then(data => { res.json(data) })
    .catch(err => { res.json(err) })
})

//GET TOP-10 MOVIES
router.get('/top10', (req, res) => {
  MovieModel.find({}).sort({ imdb_score: -1 }).limit(10)
    .then(data => { res.json(data) })
    .catch(err => { res.json(err) })
})

//GET Movies With Director
router.get('/listWithDirector', (req, res, next) => {
  MovieModel.aggregate([
    {
      $lookup: {
        from: 'directors',
        localField: 'director_id',
        foreignField: '_id',
        as: 'director'
      }
    },

  ])
    .then((data) => { res.json(data) })
    .catch((err) => {
      next({ message: "The director was not fount.", code: 99 })
      res.json(err)
    })
})


//GET BETWEEN YEAR MOVIES //gte=greater than or equal , lte= less than or equal
//http://localhost:3000/api/movies/between/1972/2008
router.get('/between/:start_year/:end_year', (req, res) => {
  const { start_year, end_year } = req.params;
  MovieModel.find({
    year: {
      "$gte": parseInt(start_year),
      "$lte": parseInt(end_year)
    }
  })
    .then(data => { res.json(data) })
    .catch(err => { res.json(err) })
})


//GET A MOVIE -1-   Burada hata tetiklemesi yapıldı
router.get('/:movieId', (req, res, next) => {
  MovieModel.findById(req.params.movieId)
    .then(data => {
      res.json(data)
    })
    .catch(err => {
      next({ message: "The movie was not found.", code: 99 })
      res.json(err)
    })
})

//GET A MOVIE -2-
/* 
router.get('/:movieId', function (req, res, next) {
  MovieModel.findById(req.params.movieId, (error, data) => {
    if (data == null) {
      next({ message: "The movie was not found.", code: 99 })
    }
    else {
      res.json(data);
    }
  })
}); */


//!----------------------------------------------------------
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


//!----------------------------------------------------------
//PUT MOVIE  //Üçüncü parametre new:true, update edilen verinin güncel halinin gönmesini sağlar
router.put('/:movieId', (req, res, next) => {
  MovieModel.findByIdAndUpdate(req.params.movieId, {
    // req.body  /* Kısaca bu kodu da yazabiliriz */
    title: req.body.title,
    imdb_score: req.body.imdb_score,
    category: req.body.category,
    country: req.body.country,
    year: req.body.year
  }, { new: true })
    .then(data => { res.json(data) })
    .catch(err => {
      next({ message: 'The movie was not fount.', code: 99 })
      res.json(err)
    })
})


//!------------------------------------------------------------
//DELETE MOVIE
router.delete('/:movieId', (req, res, next) => {
  MovieModel.findByIdAndRemove(req.params.movieId,)
    .then(data => { res.json(data) })
    .catch(err => {
      next({ message: 'The movie was not fount.', code: 99 })
      res.json(err)
    })
})




module.exports = router;

/*

modelName.functionName(filter,probObjs).[skip-limit-sort]
                        .then()
                        .catch()

                        */