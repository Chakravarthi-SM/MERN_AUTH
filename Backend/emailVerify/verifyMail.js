import nodemailer from 'nodemailer';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import handlebars from 'handlebars';
import { fileURLToPath } from 'url';    


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)


const verifyMail = async (token,mail) => {


    
    const emailTemplateSource = fs.readFileSync(
        path.join(__dirname, "template.hbs"),
        "utf-8"
    )

    const template = handlebars.compile(emailTemplateSource)
    const htmlToSend = template({ token: encodeURIComponent(token) })


    const transporter = nodemailer.createTransport({
        service : "gmail",
        auth : {
            user : process.env.MAIL_USER,
            pass : process.env.MAIL_PASS
        }
    })

    const mailConfigurations = {
        from : process.env.MAIL_USER,
        to : mail,
        subject : "Email Verification",
        html : htmlToSend,
    }

    transporter.sendMail(mailConfigurations, (error,info) => {
        if(error)
        {
            throw new Error(error)
        }

        console.log("Email Sent  successfully");
        console.log(info)
    })
}

export {verifyMail}