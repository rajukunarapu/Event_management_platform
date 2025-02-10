const express = require("express");
const { storeUsers } = require("../controllers/userController");
const { tokenGeneration } = require("../controllers/userController");
const { accessToDashboard } = require("../controllers/userController");
const { submitEvent } = require("../controllers/userController");
const { eventData } = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/signup", storeUsers);
router.post("/login", tokenGeneration);
router.get("/dashboard", authMiddleware, accessToDashboard);
router.post("/submit-event", authMiddleware, submitEvent);
router.get("/event-data",authMiddleWare, eventData);

module.exports = router;
