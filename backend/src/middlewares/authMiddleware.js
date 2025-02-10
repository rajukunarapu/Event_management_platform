const Jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  console.log({"req":req.headers})

  const token = req.headers.authorization?.split(" ")[1];
  if (!token)
    return res.status(401).send({ sucess: "fail", message: "Unauthorized" });

  try {
    const decoded = Jwt.verify(token, process.env.JWT_SECRETE);
    req.userId = decoded.userId;
    console.log({"req.userId":req.userId})
    next();

  } catch (error) {
    console.error("Access denied:", error);
  }
};

module.exports = authMiddleWare;
