const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });
const chalk = require('chalk');

module.exports = {
  sendConfirmationEmail: function confirmationEmail(user) {
    const toEmail = 'vvnsze@gmail.com';
    const generateLink = () => (
      '<b>Welcome to Kohactive!</b>'
      );

    const mail = new MailComposer({
      from: 'Kohactive <vvnsze@gmail.com>',
      to: toEmail,
      subject: 'Welcome To Kohactive',
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
          return sendError;
        }
        return body;
      });
    });
  }
};
