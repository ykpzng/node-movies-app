const mongoose = require('mongoose');

const connectionString = '<MongoDB connection String>';


module.exports = () => {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  mongoose.connection.on('open', () => { console.log("MongoDB: Connected...") });
  mongoose.connection.on('error', () => { console.log("MongoDB: Connection Failed...") });

}