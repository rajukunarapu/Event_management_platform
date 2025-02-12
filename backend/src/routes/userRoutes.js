const express = require('express');
const authMiddleWare = require('../middlewares/authMiddleware')
const {submitEvent} = require('../controllers/userController')
const {eventData} = require('../controllers/userController')

const router = express.Router();

router.post('/submit-event',authMiddleWare,submitEvent)
router.get('/event-data',authMiddleWare,eventData)

module.exports = router