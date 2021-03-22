const express = require('express');
const router = express.Router();

const { markNotificationsRead } = require('../services/notification.service');
const { authenticate } = require('../middlewares/auth');

/* If post a like or comment with the token of the user
that publishes the scream, no notification will be created */
router.post('/notifications', authenticate, markNotificationsRead);
module.exports = router;
