const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const MovieSchema = new Schema({
  //directory_id: {type:Schema.Types.ObjectId},
  directory_id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    maxlength: [50, "The field '{PATH}' must be less than ({MAXLENGTH}) characters."],
    minlength: [5, "The field '{PATH}' must be greater than ({MINLENGTH}) characters."]
  },
  category: { type: String, maxlength: 30, minlength: 1 },
  country: { type: String, maxlength: 50, minlength: 3 },
  year: { type: Number, min: 1850, max: 2100 },
  imdb_score: { type: Number, min: 0, max: 10 },
  createdAt: { type: Date, default: Date.now }
});




module.exports = mongoose.model('movie', MovieSchema);

//2- Schema oluşturduk ve root oluşturacağız sonra app.js de kullanıma açacağız