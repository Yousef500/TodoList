import smtpTransport from 'nodemailer-smtp-transport'
import nodemailer from "nodemailer";
import {connectToDatabase} from "../../lib/mongodb";

const handler = async (req, res) => {
    const {email} = req.body;
    if (email?.length > 4) {
        try {
            const {db} = await connectToDatabase();
            const user = db.collection('Users').findOne({email});
            if (user.email) return res.status(400).json({message: "User already exists"});
            const number = Math.floor(Math.random() * 9000 + 1000);
            const transporter = nodemailer.createTransport(smtpTransport({
                service: 'gmail',
                host: 'smtp.gmail.com',
                auth: {
                    user: process.env.EMAIL,
                    pass: process.env.PASS
                }
            }))

            const mailOptions = {
                from: process.env.EMAIL,
                to: email,
                subject: 'Verify your email address',
                text: `Please verify your email address with this code: ${number}`,
                html: `<!DOCTYPE html>

<html lang="en" xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:v="urn:schemas-microsoft-com:vml">
<head>
    <title></title>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"/>
    <meta content="width=device-width, initial-scale=1.0" name="viewport"/>
    <!--[if mso]>
    <xml>
        <o:OfficeDocumentSettings>
            <o:PixelsPerInch>96</o:PixelsPerInch>
            <o:AllowPNG/>
        </o:OfficeDocumentSettings>
    </xml><![endif]-->
    <!--[if !mso]><!-->
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Abril+Fatface" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Merriweather" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Bitter" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Permanent+Marker" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Roboto+Slab" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Cabin" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Oxygen" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Oswald" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Droid+Serif" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Playfair+Display" rel="stylesheet" type="text/css"/>
    <link href="https://fonts.googleapis.com/css?family=Poppins" rel="stylesheet" type="text/css"/>
    <!--<![endif]-->
    <style>
        * {
            box-sizing: border-box;
        }

        body {
            margin: 0;
            padding: 0;
        }

        a[x-apple-data-detectors] {
            color: inherit !important;
            text-decoration: inherit !important;
        }

        #MessageViewBody a {
            color: inherit;
            text-decoration: none;
        }

        p {
            line-height: inherit
        }

        .desktop_hide,
        .desktop_hide table {
            mso-hide: all;
            display: none;
            max-height: 0px;
            overflow: hidden;
        }

        @media (max-width: 700px) {
            .desktop_hide table.icons-inner {
                display: inline-block !important;
            }

            .icons-inner {
                text-align: center;
            }

            .icons-inner td {
                margin: 0 auto;
            }

            .row-content {
                width: 100% !important;
            }

            .mobile_hide {
                display: none;
            }

            .stack .column {
                width: 100%;
                display: block;
            }

            .mobile_hide {
                min-height: 0;
                max-height: 0;
                max-width: 0;
                overflow: hidden;
                font-size: 0px;
            }

            .desktop_hide,
            .desktop_hide table {
                display: table !important;
                max-height: none !important;
            }
        }
    </style>
</head>
<body style="background-color: #f5f5f5; margin: 0; padding: 0; -webkit-text-size-adjust: none; text-size-adjust: none;">
<table border="0" cellpadding="0" cellspacing="0" class="nl-container" role="presentation"
       style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f5f5f5;" width="100%">
    <tbody>
    <tr>
        <td>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-1" role="presentation"
                   style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #0452ee; background-image: url('images/heasder-bg.png'); background-repeat: no-repeat; background-size: cover; color: #000000; width: 680px;"
                               width="680">
                            <tbody>
                            <tr>
                                <td class="column column-1"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-top: 0px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="heading_block"
                                           role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                           width="100%">
                                        <tr>
                                            <td style="padding-bottom:100px;padding-top:100px;text-align:center;width:100%;">
                                                <h1 style="margin: 0; color: #ffffff; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 38px; font-weight: 700; letter-spacing: normal; line-height: 150%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                    <span class="tinyMce-placeholder">Hi there!</span></h1>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-2" role="presentation"
                   style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                               width="680">
                            <tbody>
                            <tr>
                                <td class="column column-1"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 50px; padding-right: 50px; padding-top: 0px; padding-bottom: 40px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="heading_block"
                                           role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                           width="100%">
                                        <tr>
                                            <td style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                <h3 style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 28px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                    <span class="tinyMce-placeholder">Please use this code to verify your email:</span>
                                                </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                           role="presentation"
                                           style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                           width="100%">
                                        <tr>
                                            <td style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                <div style="font-family: sans-serif">
                                                    <div class="txtTinyMce-wrapper"
                                                         style="font-size: 12px; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;">
                                                        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 30px;">
                                                            <span class="tinyMce-placeholder" style="font-size:20px;">${number}</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
            <table align="center" border="0" cellpadding="0" cellspacing="0" class="row row-3" role="presentation"
                   style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;" width="100%">
                <tbody>
                <tr>
                    <td>
                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="row-content stack"
                               role="presentation"
                               style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #ffffff; color: #000000; width: 680px;"
                               width="680">
                            <tbody>
                            <tr>
                                <td class="column column-1"
                                    style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; font-weight: 400; text-align: left; vertical-align: top; padding-left: 50px; padding-right: 50px; padding-top: 40px; padding-bottom: 0px; border-top: 0px; border-right: 0px; border-bottom: 0px; border-left: 0px;"
                                    width="100%">
                                    <table border="0" cellpadding="0" cellspacing="0" class="heading_block"
                                           role="presentation" style="mso-table-lspace: 0pt; mso-table-rspace: 0pt;"
                                           width="100%">
                                        <tr>
                                            <td style="padding-bottom:10px;padding-top:15px;text-align:center;width:100%;">
                                                <h3 style="margin: 0; color: #0452ee; direction: ltr; font-family: Poppins, Arial, Helvetica, sans-serif; font-size: 24px; font-weight: 400; letter-spacing: normal; line-height: 120%; text-align: center; margin-top: 0; margin-bottom: 0;">
                                                    <strong><span class="tinyMce-placeholder">Any problems? Contact us on</span></strong>
                                                </h3>
                                            </td>
                                        </tr>
                                    </table>
                                    <table border="0" cellpadding="0" cellspacing="0" class="text_block"
                                           role="presentation"
                                           style="mso-table-lspace: 0pt; mso-table-rspace: 0pt; word-break: break-word;"
                                           width="100%">
                                        <tr>
                                            <td style="padding-bottom:15px;padding-left:15px;padding-right:15px;padding-top:10px;">
                                                <div style="font-family: sans-serif">
                                                    <div class="txtTinyMce-wrapper"
                                                         style="font-size: 12px; mso-line-height-alt: 18px; color: #020b22; line-height: 1.5; font-family: Poppins, Arial, Helvetica, sans-serif;">
                                                        <p style="margin: 0; font-size: 14px; text-align: center; mso-line-height-alt: 30px;">
                                                            <span style="font-size:20px;">yousefashraf14725@gmail.com</span>
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                </tbody>
            </table>
        </td>
    </tr>
    </tbody>
</table><!-- End -->
</body>
</html>`
            }

            const {response} = await transporter.sendMail(mailOptions);
            console.log(response)

            if (response) {
                return res.status(200).json({number});
            }
        } catch (e) {
            console.log({e});
            return res.status(400).json({message: 'Something went wrong'});
        }
    } else {
        res.status(400).json({message: "make sure it is a POST request and there is an email in the body"});
    }
}

export default handler