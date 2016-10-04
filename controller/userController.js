var User = require('../model/user');

// Load validator
var validator = require('validator');

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

// ADDS LOCATION USER
module.exports = function (app) {
  app.put('/user', isLoggedIn, function(req, res, next){
    var locations = req.body.locations;
    console.log(locations, req.body);
    //TODO: validation
    req.user.locations = locations;
    req.user.save(function(err, updatedUser){
      if(err){
        console.log(err);
        res.json('error');
      }

      res.json('candies');
    });
  });


  app.get('/profile', isLoggedIn, function(req, res, next){

    console.log(req.user.locations);
    res.render('profile', { json: JSON.stringify(req.user.locations) } );

  });


}