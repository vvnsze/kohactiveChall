 const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sendGrid = require('./services/sendgrid');
const mailgun = require('./services/mailgun');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

module.exports = router;
