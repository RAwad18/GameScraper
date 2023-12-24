import nodemailer from 'nodemailer';
import dotenv from 'dotenv'

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}

export async function MailScraper(message) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "⚠️🚨 WEB SCRAPING ERROR ⚠️🚨",
        text: `${message}`,
        attachments: [
            {
                filename: 'scrape_log.txt',
                path: './logs/scrape/scrape_log.txt'
            }
        ]
    })

    console.log("Message sent: %s", info.messageId);
}


export async function MailSQL(message) {

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: process.env.EMAIL,
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN
        }
    });

    const info = await transporter.sendMail({
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: "⚠️🚨 SQL ERROR ⚠️🚨",
        text: `${message}`,
        attachments: [
            {
                filename: 'sql_log.txt',
                path: './logs/sql/sql_log.txt'
            }
        ]
    })

    console.log("Message sent: %s", info.messageId);
}
