var express = require('express');
var passport = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var config = require('./config');
var app = express();
var googleProfile = {};

app.set('view engine', 'pug');
app.set('views','./views');
app.use("/", express.static(__dirname));

app.use(passport.initialize());
app.use(passport.session());

//Passport routes
passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new GoogleStrategy({
        clientID: config.GOOGLE_CLIENT_ID,
        clientSecret:config.GOOGLE_CLIENT_SECRET,
        callbackURL: config.CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, cb) {
        googleProfile = {
            id: profile.id,
            displayName: profile.displayName
        };
        cb(null, profile);
    }
));



app.get('/', function(req, res){
    res.render('index', {
        name: "Login with Google",
        url: "/auth/google",
        user: req.user
    });
});


app.get('/auth/google',
    passport.authenticate('google', {
        scope : ['profile', 'email']
      }));

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect : '/logged',
        failureRedirect: '/'
    }));



app.get('/logged', function(req, res){
    res.render('login', {
        name: "You are loged in as:",
        user: googleProfile
    });
});



app.listen(3000);
app.use(function (req, res, next) {
    res.status(404).send('Sorry page dosen\'t exists!')
});
