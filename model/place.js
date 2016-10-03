const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user').schema;


var placeSchema = new mongoose.Schema ({

    name              : String,
    address           : String,
    latitude          : Number,
    longitude         : Number,
    description       : String,
    previousVisitors  : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    images            : String

})



module.exports = mongoose.model('Place', placeSchema);
//exports.model or module.exports here?