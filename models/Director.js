const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorScheme = new Schema({
  name: { type: String, maxlength: 60, minLength: 2 },
  surname: { type: String, maxlength: 60, minLength: 2 },
  bio: { type: String, maxlength: 1000, minLength: 20 },
  createdAt: { type: Date, default: Date.now },
});



module.exports = mongoose.model('director', DirectorScheme);