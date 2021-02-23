const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorScheme = new Schema({
  name: { type: String },
  surname: { type: String },
  born: { type: Date },
  adress: { type: String },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('director', DirectorScheme);