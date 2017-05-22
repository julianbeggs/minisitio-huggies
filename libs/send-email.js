'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
const transport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'bigla.developer@gmail.com',
        pass: 'santiagochile'
    }
});

module.exports = function sendEmail(to, subject, message) {
    const mailOptions = {
        from: '"Bigla Developer" <bigla.developer@gmail.com>', // sender address
        to, // list of receivers
        subject, // Subject line
        // text: 'Hello world', // plain text body
        html: message // html body
    };
    transport.sendMail(mailOptions, (error) => {
        if (error) {
            console.log(error);
        }
    });
};
