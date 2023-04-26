const mongoose = require('mongoose');

const connectDB = () => {
  mongoose
    .connect('mongodb://localhost:27017/cinimaDB')
    .then(() => {
      console.log('Connected to cinimaDB!');
      mongoose.set('strictQuery', true); // enable strict mode for queries
    }).catch((error) => console.log(error));
};

module.exports = connectDB;
