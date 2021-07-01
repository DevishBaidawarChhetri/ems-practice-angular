const jwt = require("jsonwebtoken");

module.exports.checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
      return res
        .status(401)
        .json({ message: " No token, authorization denied!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userData = {
      userId: decodedToken.userId,
      fullName: decodedToken.fullName,
      email: decodedToken.email,
      phone: decodedToken.phone,
      admin: decodedToken.admin,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Not Authenticated!" });
  }
};

module.exports.verifyAdmin = (req, res, next) => {
  if (!req.userData) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
  if (req.userData.admin !== true) {
    return res.status(403).json({ message: "Forbidden!" });
  }
  next();
};
