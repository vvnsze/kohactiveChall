const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });
const chalk = require('chalk');

exports.sendEmail = (req, res, next) => {
  if(!req.body.toEmail){
    res.send({error: 'input email address for sending'});
    return;
  }

    const prepareEmailInfo = (info) => {
      var email = { toEmail: info.toEmail };
      info.subject ? email.subject = info.subject : email.subject = '';
      info.text ? email.text = info.text : email.text = '';
      info.senderName ? email.senderName = info.senderName : email.senderName = 'noreply@kohactive.com';
      return email;
    }
    const email = prepareEmailInfo(req.body);
    const mail = new MailComposer({
      from: email.senderName,
      to: email.toEmail,
      subject: email.subject,
      text: email.text,
      html: email.text,
    });

    mail.compile().build((mailBuildError, message) => {
      const dataToSend = {
        to: email.toEmail,
        message: message.toString('ascii'),
      };
      mailgun.messages().sendMime(dataToSend, (error, body) => {
        if (error) {
          console.log(chalk.red('ERR: '), error)
          res.locals.emailInfo = email;
          next();
        } else {
          res.send({ success: 'mailgun successfully sent' });
        }
      });
    });
  }
