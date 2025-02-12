const express = require("express");
const { signup } = require("../controllers/authController");
const { signin } = require("../controllers/authController");
const authMiddleWare = require("../middlewares/authMiddleware");
// const { refreshToken} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup );
router.post("/signin",authMiddleWare, signin);
// router.post("/refresh-token", refreshToken)


module.exports = router;
