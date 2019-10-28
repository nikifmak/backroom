const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");

function generateToken(req, res, next) {
  req.token = jwt.sign(
    {
      id: req.auth.id
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: 60 * 120
    }
  );
  return next();
}

function sendToken(req, res) {
  res.setHeader("x-auth-token", req.token);
  return res.status(200).json(req.user);
}

router.post(
  "/google",
  passport.authenticate("google-token", { session: false }),
  (req, res, next) => {
    if (!req.user) {
      return res.send(401, "User Not Authenticated");
    }

    req.auth = {
      id: req.user.id
    };

    delete req.user.id;
    next();
  },
  generateToken,
  sendToken
);

module.exports = router;
