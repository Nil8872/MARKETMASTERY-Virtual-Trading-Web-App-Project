const jwt = require("jsonwebtoken");
const JWT_SECRET = "MynameIsNileshSariya@K3$5566$#";

const fetchUser = (req, res, next) => {
  try {
    const token = req.header("auth-token");
    if (!token) {
      res.status(401).send({ error: "Please authonticate using valid token" });
    }
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authonticate using valid token" });
  }
};

module.exports = { fetchUser };
