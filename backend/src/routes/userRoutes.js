const express = require('express');
const { storeUsers } = require("../controllers/userController");
const { tokenGeneration } = require("../controllers/userController");
const { accessToDashboard } = require("../controllers/userController");

const router = express.Router()

router.post('/signup',storeUsers);
router.post('/login',tokenGeneration);
router.get('/dashboard',accessToDashboard);

module.exports = router;
