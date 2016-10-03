var User = require('../model/user');

// Load validator
var validator = require('validator');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login')
}

// ADDS LOCATION USER
module.exports = function (app) {
  app.put('/user', isLoggedIn, function(req, res, next){
    var locations = req.body.locations;
    //TODO: validation
    req.user.locations = locations
    req.user.save();
    res.json('ok');
  });

}