const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });
const sendGrid = require('./sendgrid');
const chalk = require('chalk');


exports.sendEmail = (req, res, next) => {
  //need something to check for empty values
    const toEmail = req.body.toEmail;
    const subject = req.body.subject;
    const text = req.body.text;
    const senderName = req.body.senderName;
    const generateLink = () => (
      req.body.text
    );

    const mail = new MailComposer({
      from: senderName,
      to: toEmail,
      subject: subject,
      text: generateLink(),
      html: generateLink(),
    });

    mail.compile().build((mailBuildError, message) => {
      const dataToSend = {
        to: toEmail,
        message: message.toString('ascii'),
      };
      mailgun.messages().sendMime(dataToSend, (sendError, body) => {
        if (sendError) {
          sendGrid.useSendGridEmail({ toEmail, subject, text, senderName });
        }
        res.send({success: 'successfully sent'});
      });
    });
  }
