const JWT_SCERET = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHEader = req.headers.authorization;

  if (!authHEader || !authHEader.startsWith("Bearer ")) {
    return res.status(403).json({});
  }

  const token = authHEader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SCERET);

    if (decoded.userId) {
      req.userId = decoded.userId;
      next();
    } else {
      return res.status(403).json({});
    }
  } catch (err) {
    return res.status(403).json({});
  }
};

module.exports = {
  authMiddleware,
};
