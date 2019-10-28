const passport = require("passport");
const GoogleTokenStrategy = require("passport-google-token").Strategy;

passport.use(
  new GoogleTokenStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      if (["nikiforos@roomivate.com"].includes(email)) {
        done(null, { email, id: profile.id });
      } else {
        done(null, null);
      }
    }
  )
);
