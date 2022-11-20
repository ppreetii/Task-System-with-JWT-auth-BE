const jwt = require("jsonwebtoken")
const jwtConfig = require("../db/config/jwt");

module.exports = (req, res, next) => {
  let token = req.headers.authorization.split(" ")[1];

  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "No Token provided.",
    });
  }
  if (!req.headers.authorization.startsWith("Bearer")) {
    return res.status(401).send({
      message: "Please provide proper token",
    });
  }
  
  jwt.verify(token, jwtConfig.secret, (err, decoded) => {
    if (err) {
      return res.status(403).send({
        message: "Unauthorized!",
      });
    }
    req.user = decoded.id;
    next();
  });
};
