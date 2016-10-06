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
  app.get('/list/:id', function (req, res, next) {
    List.findOne({_id: req.params.id}, function(err, list){
      if (err) { return res.json(err).status(401) }

      if (!list) { return res.json({message: "no list found"}).status(401) }

      res.json(list);
    })
  });

  app.post('/list', isLoggedIn, function(req, res, next){
    var visitor = req.user._id;
    var places  = req.body.places;

    List.create({
      visitor: visitor,
      location: places.location,
      accomodation: places.accomodation,
      foodandbev: places.foodandbev,
      activities: places.activities
    }, function (err, list) {
      if (err) { return res.json(err) }

      res.json(list);
    });
  });
}

// ATTACHES LIST TO USER



