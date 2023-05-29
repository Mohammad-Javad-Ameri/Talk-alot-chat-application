const jwt = require("jsonwebtoken");

const verify = (req, res, next) => {
  const authHeaders = req.headers.authorization;
  if (authHeaders) {
    const token = authHeaders.split("")[1];

    if (!token) {
      return res.status(400).json({ message: "Dont have Token" });
    }

    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).send({ msg: "Forbidden" });
      }

      req.user = user;
      next();
    });
  } else {
    return res.status(401).send({ msg: "Unauthorized" });
  }
};

module.exports = verify;
