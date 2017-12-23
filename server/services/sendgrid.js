const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const chalk = require('chalk');

exports.useSendgridEmail = (userInformation) => {
  console.log(chalk.magenta('userInformation: '), userInformation)
  const msg = {
    to: 'vvnsze@gmail.com',
    from: 'vvnsze@gmail.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail.send(msg);
};
