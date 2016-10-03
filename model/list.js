const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const locationSchema = require('./location').schema;
const placeSchema = require('./place').schema;
const userSchema = require('./user').schema;



var listSchema = new mongoose.Schema ({

    visitor           : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    with              : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    location          : [{ type: Schema.Types.ObjectId, ref: 'Location' }],
    places            : [{ type: Schema.Types.ObjectId, ref: 'Place' }],
    from              : Date,
    to                : Date,
    comment           : String,
    images            : String, // URL from FB / Instagram

})


module.exports = mongoose.model('List', listSchema);
//exports.model or module.exports here?
