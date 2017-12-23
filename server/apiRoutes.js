 const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const sendGrid = require('./services/sendgrid');
const mailgun = require('./services/mailgun');
const chalk  = require('chalk');

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

router.post('/email',(req,res) => {
  mailgun.sendEmail(req, res);
})

module.exports = router;
