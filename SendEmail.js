const nodemailer = require('nodemailer');
const fs = require("fs");
const smtpTransport = require('nodemailer-smtp-transport');

function emailModule() {
    const transporter = nodemailer.createTransport(smtpTransport({
        service: 'Gmail',
        host: 'smtp.gmail.com',
        port: 465,
        auth: {
            user: 'leeznon@gmail.com',
            pass: 'anthonyd1'
        }
    }));

    transporter.sendMail({
        from: "leeznon@gmail.com",
        subject: "State Farm Jobs",
        text: "Hey, here are the job searches:",
        attachments: [
            {
                'filename': 'state-farm-jobs.txt',
                'path': 'C:/Users/Anthony/Documents/git/automated-job-web-scraping/state-farm-jobs.txt'
            }
        ],
        to: "leeznon@gmail.com"
    }, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        console.log("E-Mail sent successfully to leeznon@gmail.com");
    });
}

module.exports = emailModule;