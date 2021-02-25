const express = require('express');
const router = express.Router();
//Model
const DirectorModel = require('../models/Director');

// Bir directorun filmleriyle birlikte gelmesi için Lookup kullanacağız (aggregate kullanacağız)
//GET directors list  http://localhost:3000/api/directors
router.get('/', (req, res) => {
  const resualtQuery = DirectorModel.aggregate([
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },
    {
      $unwind: {  // Sadece filmi olan yönetmenler listeleniyor
        path: '$movies',
        preserveNullAndEmptyArrays: false

      }
    },
    {
      $group: {  // aynı yönetmene ait filmleri grup olarak gösterdik(name ve surname aynı olan filmleri movies de birleştir)
        _id: {
          name: '$name',
          surname: '$surname'
        },
        movies: {
          $push: '$movies'
        }
      }
    },
    {
      $project: {   // Belirtilen alanları listeler
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        'movies.title': 1,
        'movies.imdb_score': true //==1
      }
    }
  ]);

  resualtQuery.then((data) => { res.json(data) })
    .catch((err) => {
      next({ message: "The director was not fount.", code: 99 })
      res.json(err)
    })
})


const mongoose = require('mongoose');
//GET A director
router.get('/:directorId', (req, res, next) => {
  const resualtQuery = DirectorModel.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.directorId)
      }
    },
    {
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies'
      }
    },

  ]);

  resualtQuery.then((data) => { res.json(data) })
    .catch((err) => {
      next({ message: "The director was not fount.", code: 99 })
      res.json(err)
    })
})



//POST ADD Director
router.post('/', (req, res, next) => {
  const director = new DirectorModel(req.body);   //Schema daki tüm itemleri alır

  director.save()
    .then((data) => { res.json(data) })
    .catch((err) => { next({ message: "The director was not.", code: 99 }); res.json(err) })
})


//PUT director  //Üçüncü parametre new:true, update edilen verinin güncel halinin gönmesini sağlar
router.put('/:directorId', (req, res, next) => {
  DirectorModel.findByIdAndUpdate(req.params.directorId, req.body, { new: true })
    .then(data => { res.json(data) })
    .catch(err => {
      next({ message: 'The movie was not fount.', code: 99 })
      res.json(err)
    })
})


//DELETE director
router.delete('/:directorId', (req, res, next) => {
  DirectorModel.findByIdAndRemove(req.params.directorId,)
    .then(data => { res.json(data) })
    .catch(err => {
      next({ message: 'The movie was not fount.', code: 99 })
      res.json(err)
    })
})



module.exports = router;