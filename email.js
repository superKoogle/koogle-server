var nodemailer = require('nodemailer');

// https://support.google.com/mail/answer/185833?hl=iw


var transporter = nodemailer.createTransport({
  service: 'outlook',
  auth: {
    user: '36213936065@mby.co.il',
    pass: 'Student@264'
  }
});




module.exports = transporter;