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

module.exports = function (app) {
  app.get('/user/list/:id', isLoggedIn, function (req, res, next) {
    var user   = req.user;
    var listId = req.params.id;
    var found  = null;

    user.lists.forEach(function(element){
      if(element._id == listId){
        return found = element;
      }
    });

    if (!found) {
      res.json("Cannot find list").status(404);
    } else {
      res.json(found);
    }
  });

  app.put('/user/list/:id', isLoggedIn, function (req, res, next) {
    var listId  = req.params.id;
    var user    = req.user;
    var visitor = user._id
    var places  = req.body.places;

    req.user.lists.forEach(function(element){
      if(element._id == listId){
        element.location     = places.location;
        element.accomodation = places.accomodation;
        element.foodandbev   = places.foodandbev;
        element.activities   = places.activities;

        return req.user.save(function(err, updatedUser){
          return res.json(updatedUser.lists);
        });
      }
    });
  });

  app.post('/user/list', isLoggedIn, function(req, res, next){
    var visitor = req.user._id;
    var places  = req.body.places;

    req.user.lists.push({
      visitor: visitor,
      location: places.location,
      accomodation: places.accomodation,
      foodandbev: places.foodandbev,
      activities: places.activities
    });

    req.user.save(function(err, updatedUser) {

      if(err){
        console.log(err);
      }

      res.json(req.user.lists);
    });
  });

 app.delete('/user/list/:id', isLoggedIn, function(req, res){
    var listId = req.params.id;

    req.user.lists.forEach(function(element, index){
      if(element._id == listId){
        req.user.lists.splice(index, 1);
        return req.user.save(function(err, updatedUser){
          return res.json("deleted");
        });
      }
    });
  });
}


