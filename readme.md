# Email Service
This provides an API to send an email to multiple recipients; It will attempt to send
emails using Mailgun and Sendgrid as backup.

## API
`POST api/email` sends the email(s) to the recipients

Post Data
`toEmail` the field for recipients' email destinations
`subject` the subject line
`text` the message body
`senderName` The sender's email address and name e.g. `jon snow <jonsnow@thewall.com>`

Example Post request. Replace `[TOKEN]` with your values:
```
curl --request POST \
  --url http://localhost:1337/api/email \
  --header 'Cache-Control: no-cache' \
  --header 'Content-Type: application/x-www-form-urlencoded' \
  --data 'toEmail=[EMAIL_1]&toEmail=[EMAIL_2]&subject=[SUBJECT]&text=[TEXT]&senderName=[SENDER_EMAIL]'
```

## Setup
clone repo
`yarn install`
`yarn start`

## Environment Variables
```
MAILGUN_API_KEY=
MAILGUN_DOMAIN=

SENDGRID_API_KEY=
SENDGRID_API_KEY_ID=

# PORT defaults to 1337
PORT=
```
