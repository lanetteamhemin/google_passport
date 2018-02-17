var GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
var {googleAuth}=require('./auth');

module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    passport.use(new GoogleStrategy(
        googleAuth
        ,
        function(token, refreshToken, profile, done) {
            // console.log(profile);
            return done(null,profile);
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Google
            // try to find the user based on their google id

        })
    );
}