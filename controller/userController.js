var User = require('../model/user');

// Load validator
var validator = require('validator');

// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

// ATTACHES LOCATIONS AND TRAVEL STATS TO USER
module.exports = function (app) {
  app.put('/user', isLoggedIn, function(req, res, next){
    var locations = req.body.locations;
    var worldCoverage = req.body.worldCoverage;
    var travelPercentage = req.body.travelPercentage;
    var travelLevel = req.body.travelLevel;

    //TODO: validation
    req.user.locations = locations;
    req.user.worldCoverage = worldCoverage;
    req.user.travelPercentage = travelPercentage;
    req.user.travelLevel = travelLevel;

    req.user.save(function(err, updatedUser){
      if(err){
        console.log(err);
        res.json('error');
      }
      res.json('candies');
    });
  });
}