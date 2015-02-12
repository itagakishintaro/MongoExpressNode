// http://passportjs.org/guide/twitter/
var TWITTER_CONSUMER_KEY = 'Li7ar8FWkwB9JxyUg5I1qlNju';
var TWITTER_CONSUMER_SECRET = 'RQShl22nO8bf6r1U8PVneH1IiUHupXWhTYTSLjYxUSt6rA45A1';
var passport = require('passport')
  , TwitterStrategy = require('passport-twitter').Strategy;

// Sessionの設定
// http://passportjs.org/guide/configure/
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(obj, done) {
    done(null, obj);
});

passport.use(new TwitterStrategy({
    consumerKey: TWITTER_CONSUMER_KEY,
    consumerSecret: TWITTER_CONSUMER_SECRET,
    callbackURL: "http://localhost:3000/auth/twitter/callback"
  },
  function(token, tokenSecret, profile, done) {
  	passport.session.id = profile.id;

  	// tokenとtoken_secretをセット
  	profile.twitter_token = token;
    profile.twitter_token_secret = tokenSecret;

    process.nextTick(function () {
    	return done(null, profile);
    });
  }
));

module.exports = {passport: passport};