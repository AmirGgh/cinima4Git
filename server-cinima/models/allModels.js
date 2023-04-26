const mongoose = require('mongoose');


const userSchema = new mongoose.Schema(
  {
    username: String,
    password: String,
    memberID: String,
  },
  { versionKey: false }
);


const User = mongoose.model('user', userSchema);

module.exports = { User }


