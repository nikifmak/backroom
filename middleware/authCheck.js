const jwt = require("jsonwebtoken");

function authCheck(req, res, next) {
  const token = req.header("Authorization");

  if (!token) return res.status(401).send("Access denied");

  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
}

module.exports = authCheck;
