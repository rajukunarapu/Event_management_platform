const Jwt = require("jsonwebtoken");

const authMiddleWare = async (req, res, next) => {
  // console.log({"req":req.headers})

  const token = req.headers.authorization?.split(" ")[1];
  // console.log({"token":token})
  if (!token)
    return res.status(401).send({ sucess: "fail", message: "Unauthorized" });

  try {
    const decoded = Jwt.verify(token, process.env.ACCESS_TOKEN_SECRETE);
    req.userId = decoded.userId;
    // console.log({"req.userId":req.userId})
    next();
    // res.status(200).send({ sucess: "ok", message: "authorized" });

  }catch (error) {
    console.error("Access denied:", error);
    return res.status(401).send({ sucess: "fail", message: "Unauthorized" });
  }
};

module.exports = authMiddleWare;
