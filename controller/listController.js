var List = require('../model/list');

// Load validator
var validator = require('validator');

// Middleware
function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect('/')
}

// ATTACHES PlACES TO LIST
module.exports = function (app) {
  app.put('/list', isLoggedIn, function(req, res, next){
    var visitor = req.user.name;
    var places = req.body.places;
    var comment = req.body.comment;

    //TODO: validation
    req.list.visitor = visitor;
    req.list.places = places;
    req.list.comment = coment;

    req.list.save(function(err, updatedList){
      if(err){
        console.log(err);
        res.json('error');
      }
      res.json('candies');
    });
  });
}

// ATTACHES LIST TO USER



