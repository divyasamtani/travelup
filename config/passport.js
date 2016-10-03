// Load passport local
var localStrategy = require('passport-local').Strategy;

// Load passport facebook
var facebookStrategy = require('passport-facebook').Strategy;

// Load passport instagram
var instagramStrategy = require('passport-instagram').Strategy;

// Load validator
var validator = require('validator');

// Load user model
var User = require('../model/user');

module.exports = function( passport ) {

  // Serialize user
  passport.serializeUser( function( user, done){
      done(null, user.id);
  });

  // Deserialize user
  passport.deserializeUser(function(id, done){
      User.findById(id, function(err, user){
        done(err, user);
      });
  });

  // Passport signup
  passport.use('local-signup', new localStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function( req, email, password, done){

        // Check that the email is in the right format
        if( !validator.isEmail(email) ){
          return done(null, false, req.flash('loginMessage','That is not a valid email address'));
        }

        // Check that the password is at least 8 chars
        if( password.length < 8 ){
          return done(null, false, req.flash('loginMessage','The password needs to be 8 chars long'));
        }

        process.nextTick(function(){
          User.findOne( {'local.email' : email }, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              return done(null, false, req.flash('loginMessage','That email is already in use'));
            }else{
              var newUser = new User();
              newUser.local.email = email;
              newUser.local.password = password;
              newUser.save(function(err){
                if(err){
                  console.log(err);
                }
                return done(null, newUser, req.flash('loginMessage', 'Logged in successfully'));
              });
            }
          });
        });
    }));

  // Passport login
  passport.use('local-login', new localStrategy({
      usernameField : 'email',
      passwordField : 'password',
      passReqToCallback: true
    },
    function( req, email, password, done){
        process.nextTick(function(){
          User.findOne( {'local.email' : email }, function(err, user){
            if(err){
              return done(err);
            } if(!user){
              return done(null,false, req.flash('loginMessage', 'sorry no one by that email'));
            }
            user.validPassword(password, function(err, isMatch){
              if(isMatch){
                return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
              }
              return done(null,false, req.flash('loginMessage', 'sorry wrong password'));
            })
          });
        });
    }));

// FACEBOOK LOGIN

  passport.use(new facebookStrategy({
    clientID: "593738544131570",
    clientSecret: "93eb98281889228dd8fc1b5ff1913cb9",
    callbackURL: "http://localhost:3000/auth/facebook/callback",
    passReqToCallback: true
  }, function(req, accessToken, refreshToken, profile, done) {


      process.nextTick(function(){
          User.findOne( {'facebook.id' : profile.id }, function(err, user){
            if(err){
              return done(err);
            }
            if(user){
              return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
            } else{
              var newUser = new User();
              newUser.facebook.id = profile.id;
              newUser.facebook.token = accessToken;
              newUser.facebook.name = profile.displayName;
              newUser.save(function(err){
                if(err){
                  console.log(err);
                }
                return done(null, newUser, req.flash('loginMessage', 'Logged in successfully'));
              });
            }
          });
      });
  }));

//INSTAGRAM LOGIN

  passport.use(new instagramStrategy({
    clientID: "dceb2be1d1c14243872f462a932774cf",
    clientSecret: "7caef7ab7b2a442a9826e7191e0b1148",
    callbackURL: "http://localhost:3000/auth/instagram/callback",
    passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
      User.findOne( {'instagram.id' : profile.id }, function(err, user){
        if(err){
          return done(err);
        }
        if(user){
              return done(null, user, req.flash('loginMessage', 'Logged in successfully'));
            }else{
              var newUser = new User();
              newUser.instagram.id = profile.id;
              newUser.instagram.token = accessToken;
              newUser.instagram.name = profile.displayName;
              newUser.save(function(err){
                if(err){
                  console.log(err);
                }
                return done(null, newUser, req.flash('loginMessage', 'Logged in successfully'));
              });
            }
          });
      });
  }));
}