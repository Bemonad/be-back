const nodemailer = require('nodemailer');

module.exports = (user) => {

  let mailConfig;

  if (process.env.NODE_ENV === 'prod' ){
    mailConfig = {
      host: 'smtp.sendgrid.net',
      port: 587,
      auth: {
        user: 'real.user',
        pass: 'verysecret'
      }
    };
  } else {
    mailConfig = {
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.EMAIL_USER_NAME,
        pass: process.env.EMAIL_USER_PASSWORD,
      }
    };
  };

  let transport = nodemailer.createTransport(mailConfig);

  const message = {
    from: 'elonmusk@tesla.com',
    to: user.email,
    subject: 'Register',
    html: `
      <h1>Hello,</h1>
      <p>To register on Bemonad click the link below</p>
      <a href=${process.env.FRONT_URL + '?id=' + user.token}>REGISTER</a>
    `,
  };

  transport.sendMail(message, function(err, info) {
    if (err) {
      console.log(err)
    } else {
      console.log(info);
    }
  });

};
