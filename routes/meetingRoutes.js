const express = require('express');
const router = express.Router();
const meetingController = require('../controllers/meetingController');

// Route to save meeting data
router.post('/save-meeting', meetingController.saveMeetingData);

module.exports = router;
