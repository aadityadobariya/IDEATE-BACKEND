const jwt = require("jsonwebtoken");

const isAuthorized = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null)
    return res.status(401).json({ message: "Unauthorized user." });

  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
    if (err)
      return res
        .status(403)
        .json({ message: "You don't have permission to access the info." });
    req.user = user;

    next();
  });
};

module.exports = isAuthorized;
