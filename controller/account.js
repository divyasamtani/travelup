var List = require('../model/list');

module.exports = function (app, passport) {

// ROUTER MIDDLEWARE
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }

// ACCOUNT SIGN UP AND LOGIN PAGES *******************************************************************************

  // SIGN UP
  app.get('/', function(req, res){
    res.render('auth', { message: req.flash('loginMessage') });
  });

  app.post('/', function(req, res, next){
    passport.authenticate('local-signup', function(err, user, info){
      if (err) {return res.json(err).status(500);}
      if (!user) {return res.json(info).status(400);}
      req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.json({detail: user});
      });

    })(req,res,next);
  })

  // LOGIN
  app.get('/auth', function(req, res){
    res.render('auth', { message: req.flash('loginMessage') });
  });

  app.post('/auth', passport.authenticate('local-login', {
    successRedirect : '/secret',
    failureRedirect : '/',
    failureFlash: true
  }));


// ROUTES TO PAGES *********************************************************************************************


  // DIRECTS TO USER PROFILE PAGE
  app.get('/profile', isLoggedIn, function(req, res, next){
    var userJSON = JSON.stringify(req.user.locations, req.user.worldCoverage, req.user.travelPercentage, req.user.travelLevel);

    res.render('profile', { json: userJSON, lists: req.user.lists });

  });

  // DIRECTS TO PROFILE SET UP PAGE
  app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret', { message: req.flash('loginMessage'), json: JSON.stringify(req.user.locations)});
  });


  // DIRECTS TO LIST PAGE
  app.get('/list', isLoggedIn, function(req, res, next){
    res.render('list', { message: req.flash('loginMessage') });
  });


// SOCIAL MEDIA AUTHORIZATION ***********************************************************************************


  // FACEBOOK LOGIN
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // FB CALLBACK
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/secret',
    failureRedirect : '/auth',
    failureFlash: true
  }));

  // INSTAGRAM LOGIN
 app.get('/auth/instagram', passport.authenticate('instagram'));

  // INSTAGRAM CALLBACK
 app.get('/auth/instagram/callback', passport.authenticate('instagram',{
     successRedirect: '/secret',
     failureRedirect: '/auth',
     failureFlash: true
   }));


  // LOGOUT
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}



