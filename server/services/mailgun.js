const apiKey = process.env.MAILGUN_API_KEY;
const domain = process.env.MAILGUN_DOMAIN;
const MailComposer = require('nodemailer/lib/mail-composer');
const mailgun = require('mailgun-js')({ apiKey, domain });

exports.sendEmail = (req, res, next) => {
	if (!req.body.toEmail) {
		res.send({ error: 'input email address for sending' });
		return;
	}

	const {
    toEmail,
    subject = '',
    text = '',
    senderName = 'noreply@kohactive.com',
  } = req.body;

	const mail = new MailComposer({
		from: senderName,
		to: toEmail,
		subject,
		text,
		html: text,
	});

	mail.compile().build((mailBuildError, message) => {
		const dataToSend = {
			to: toEmail,
			message: message.toString('ascii'),
		};
		mailgun.messages().sendMime(dataToSend, (error) => {
			if (error) {
				res.locals.emailInfo = email;
				next();
			} else {
				res.send({ success: 'mailgun successfully sent' });
			}
		});
	});
};
