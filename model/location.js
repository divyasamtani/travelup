const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = require('./user').schema;
const listSchema = require('./list').schema;



var locationSchema = new mongoose.Schema ({

    name              : String,
    latitude          : Number,
    longitude         : Number,
    status            : String,
    previousVisitors  : [{ type: Schema.Types.ObjectId, ref: 'User' }],
    images            : String
})


module.exports = mongoose.model('Location', locationSchema);
//exports.model or module.exports here?