const mongoose = require('mongoose');

//you should make the filename db.js
//You must put a connection to your database here.
const connectionString = '<MongoDB connection String>';


module.exports = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('open', () => { console.log("MongoDB: Connected...") });
  mongoose.connection.on('error', () => { console.log("MongoDB: Connection Failed...") });


  mongoose.Promise = global.Promise;  // Eğer routes de promise kullanacaksak bunu eklemeliyiz. Mongoose 5 ten sonra gerek yoktur
}