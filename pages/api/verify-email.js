import smtpTransport from 'nodemailer-smtp-transport'
import nodemailer from "nodemailer";

const handler = async (req, res) => {
    const {email} = req.body;
    if (email) {
        try {
            // mailchimp.setConfig({
            //     apiKey: process.env.MAILCHIMP_API_KEY,
            //     server: process.env.MAILCHIMP_SERVER_PREFIX
            // });(
            //
            // const response = await mailchimp.lists.addListMember(process.env.LIST_ID, {
            //     email_address: email,
            //     status: 'pending'
            // });

            const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            }))

            const mailOptions = {
                from: 'Kazuya14725@gmail.com',
                to: email,
                subject: 'Verify your email address',
                text: 'Please verify your email address',
                html: `<h1>Please use this code to verify your email: 1234</h1>`
            }

            const {response} = await transporter.sendMail(mailOptions);

            return res.status(200).json(response);
        } catch (e) {
            console.log({e});
            return res.status(400).json({message: 'Something went wrong'});
        }
    } else {
        res.status(400).json({message: "make sure it is a POST request and there is an email in the body"});
    }
}

export default handler