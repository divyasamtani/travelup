module.exports = function (app, passport) {

  // router middelware
  function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()) {
      return next();
    }
    res.redirect('/')
  }

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
  app.get('/login', function(req, res){
    res.render('login', { message: req.flash('loginMessage') });
  });

  app.post('/login', passport.authenticate('local-login', {

    successRedirect : '/secret',
    failureRedirect : '/',
    failureFlash: true
  }));


  // FACEBOOK LOGIN
  app.get('/auth/facebook', passport.authenticate('facebook'));

  // FB CALLBACK
  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    successRedirect : '/secret',
    failureRedirect : '/login',
    failureFlash: true
  }));

  // INSTAGRAM LOGIN
 app.get('/auth/instagram', passport.authenticate('instagram'));

  // INSTAGRAM CALLBACK
 app.get('/auth/instagram/callback', passport.authenticate('instagram',{
     successRedirect: '/secret',
     failureRedirect: '/login',
     failureFlash: true
   }));

    // SECRET (IF LOGGED IN)
  app.get('/secret', isLoggedIn, function(req, res){
    res.render('secret', { message: req.flash('loginMessage'), json: JSON.stringify(req.user.locations) });
  });

  // LOGOUT
  app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
  });
}



