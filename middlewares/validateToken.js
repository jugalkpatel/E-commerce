const jwt = require("jsonwebtoken");

require("dotenv").config();

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    if (decoded.uname === req.user.name) {
      next();
      return;
    }

    res.status(401).json({
      success: false,
      message: "unauthorized: Invalid user",
    });
  } catch (error) {
    console.log(error);
    res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid Token",
    });
  }
};

module.exports = { validateToken };
