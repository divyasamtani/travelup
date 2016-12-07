const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const placeSchema = require('./place').schema;
const userSchema = require('./user').schema;


var listSchema = new mongoose.Schema ({
  visitor           : {type: Schema.Types.ObjectId, ref: 'User'},
  location          : String,
  accomodation      : String,
  foodandbev        : [String],
  activities        : [String]
});

module.exports = mongoose.model('List', listSchema);




