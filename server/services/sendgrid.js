const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const chalk = require('chalk');

exports.sendEmail = (req, res) => {
  console.log(chalk.magenta('typeof email: '), typeof(res.locals.emailInfo.toEmail));
  const email = res.locals.emailInfo;
  const msg = {
    to: email.toEmail,
    from: email.senderName,
    subject: email.subject,
    text: email.text,
    html: email.text,
  };
  if(typeof(email.toEmail) === 'object') {
    sgMail.sendMultiple(msg)
    .then(() => {
      res.send({success: 'successfully sent emails; failed mailgun'})
    }).catch((err) => {
      res.send({error: 'error with backup email service'})
    });
  } else {
    sgMail.send(msg)
    .then(() => {
      res.send({ success: 'successfully sent email; failed mailgun' });
    }).catch((err) => {
      res.send({ error: 'error with backup email service' });
    });
  }
};
