const express = require('express');
const router = express.Router();
const sendGrid = require('./services/sendgrid');
const mailgun = require('./services/mailgun');

router.post('/email',[
	mailgun.sendEmail,
	sendGrid.sendEmail,
]);

module.exports = router;
