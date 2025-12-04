import * as SibApiV3Sdk from "@getbrevo/brevo";

const apiKey = process.env.BREVO_API_KEY!;
if (!apiKey) console.error("BREVO_API_KEY environment variable is not set!");

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

if (apiKey)
    apiInstance.setApiKey(
        SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
        apiKey
    );

interface SendEmailPayload {
    to: { email: string; name?: string }[];
    subject: string;
    htmlContent: string;
}

interface EnquiryEmailData {
    name: string;
    email: string;
    phone: string;
    message: string;
}

async function sendEmail(options: SendEmailPayload) {
    try {
        if (!process.env.BREVO_API_KEY) {
            console.error("Cannot send email: BREVO_API_KEY not configured");
            return {
                success: false,
                data: null,
                message: "API key not configured",
            };
        }

        if (
            !process.env.BREVO_SENDER_EMAIL ||
            !process.env.BREVO_SENDER_NAME ||
            !process.env.BREVO_REPLY_TO_EMAIL
        ) {
            console.error(
                "Cannot send email: BREVO_SENDER_EMAIL, BREVO_SENDER_NAME or BREVO_REPLY_TO_EMAIL not configured"
            );
            return {
                success: false,
                data: null,
                message: "Sender email not configured",
            };
        }

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

        sendSmtpEmail.to = options.to;
        sendSmtpEmail.subject = options.subject;
        sendSmtpEmail.htmlContent = options.htmlContent;

        sendSmtpEmail.sender = {
            name: process.env.BREVO_SENDER_NAME,
            email: process.env.BREVO_SENDER_EMAIL,
        };

        sendSmtpEmail.replyTo = {
            email: process.env.BREVO_REPLY_TO_EMAIL,
        };

        const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

        return {
            success: true,
            data,
            message: `Email sent successfully to ${options.to[0].email}`,
        };
    } catch (error) {
        console.error("Error sending email:", error);
        return {
            success: false,
            data: null,
            message: "Failed to send email",
        };
    }
}

export default async function sendEnquiryConfirmationEmail(
    data: EnquiryEmailData
) {
    try {
        let htmlTemplate = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inquiry Confirmation</title>
</head>

<body
    style="margin:0; padding:0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh;">

    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"
        style="position: relative; z-index: 1; padding: 40px 20px;">
        <tr>
            <td align="center">
                <table role="presentation"
                    style="width: 100%; max-width: 650px; background: rgba(255,255,255,0.95); backdrop-filter: blur(20px); border-radius: 20px; box-shadow: 0 25px 50px rgba(0,0,0,0.25); overflow: hidden; border: 1px solid rgba(255,255,255,0.2);"
                    cellpadding="0" cellspacing="0">

                    <!-- Header with gradient -->
                    <tr>
                        <td
                            style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); padding: 40px 30px; text-align: center; position: relative;">

                            <h1
                                style="margin:0; color: white; font-size: 28px; font-weight: 700; text-shadow: 0 2px 4px rgba(0,0,0,0.1); letter-spacing: -0.5px;">
                                Thanks for reaching out, {{name}}!</h1>
                            <p
                                style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px; font-weight: 300;">
                                Your message has been received</p>
                        </td>
                    </tr>

                    <!-- Main content -->
                    <tr>
                        <td style="padding: 40px 30px; color: #333;">
                            <div style="margin-bottom: 30px;">
                                <h2 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 22px; font-weight: 600;">Hi
                                    {{name}},</h2>
                                <p style="margin: 0 0 20px 0; font-size: 16px; line-height: 1.6; color: #555;">Thank you
                                    for contacting me through my portfolio. I've received your inquiry and here's a
                                    summary of the information you submitted:</p>
                            </div>

                            <!-- Information cards -->
                            <div
                                style="background: linear-gradient(135deg, #f8f9ff 0%, #e8f4fd 100%); border-radius: 15px; padding: 25px; margin: 25px 0; border: 1px solid rgba(79, 172, 254, 0.1);">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(79, 172, 254, 0.1);">
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 100px; vertical-align: top;">
                                                        <div
                                                            style="display: inline-block; padding: 6px 12px; background: rgba(79, 172, 254, 0.1); border-radius: 20px; font-size: 12px; font-weight: 600; color: #4facfe; text-transform: uppercase; letter-spacing: 0.5px;">
                                                            Name</div>
                                                    </td>
                                                    <td
                                                        style="padding-left: 15px; font-size: 16px; color: #2c3e50; font-weight: 500;">
                                                        {{name}}</td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(79, 172, 254, 0.1);">
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 100px; vertical-align: top;">
                                                        <div
                                                            style="display: inline-block; padding: 6px 12px; background: rgba(79, 172, 254, 0.1); border-radius: 20px; font-size: 12px; font-weight: 600; color: #4facfe; text-transform: uppercase; letter-spacing: 0.5px;">
                                                            Email</div>
                                                    </td>
                                                    <td style="padding-left: 15px;">
                                                        <a href="mailto:{{email}}"
                                                            style="color: #4facfe; text-decoration: none; font-size: 16px; font-weight: 500; transition: color 0.3s ease;">{{email}}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0; border-bottom: 1px solid rgba(79, 172, 254, 0.1);">
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 100px; vertical-align: top;">
                                                        <div
                                                            style="display: inline-block; padding: 6px 12px; background: rgba(79, 172, 254, 0.1); border-radius: 20px; font-size: 12px; font-weight: 600; color: #4facfe; text-transform: uppercase; letter-spacing: 0.5px;">
                                                            Phone</div>
                                                    </td>
                                                    <td style="padding-left: 15px;">
                                                        <a href="tel:{{phone}}"
                                                            style="color: #4facfe; text-decoration: none; font-size: 16px; font-weight: 500; transition: color 0.3s ease;">{{phone}}</a>
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="padding: 12px 0;">
                                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td style="width: 100px; vertical-align: top; padding-top: 5px;">
                                                        <div
                                                            style="display: inline-block; padding: 6px 12px; background: rgba(79, 172, 254, 0.1); border-radius: 20px; font-size: 12px; font-weight: 600; color: #4facfe; text-transform: uppercase; letter-spacing: 0.5px;">
                                                            Message</div>
                                                    </td>
                                                    <td
                                                        style="padding-left: 15px; font-size: 16px; color: #555; line-height: 1.6;">
                                                        {{message}}
                                                    </td>
                                                </tr>
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                            <!-- Response message -->
                            <div
                                style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 15px; padding: 25px; margin: 5px 0; text-align: center; color: white;">
                                <div style="font-size: 18px; font-weight: 600; margin-bottom: 8px;">What's Next?</div>
                                <p style="margin: 0; font-size: 16px; line-height: 1.5; opacity: 0.95;">I'll review your
                                    message carefully and get back to you within 24 hours. Thank you for your patience!
                                </p>
                            </div>
                        </td>
                    </tr>

                    <!-- Footer with contact options -->
                    <tr>
                        <td style="background: #f8f9fa; border-top: 1px solid rgba(0,0,0,0.05); padding: 30px;">
                            <div style="text-align: center; margin-bottom: 10px;">
                                <h3 style="margin: 0 0 15px 0; color: #2c3e50; font-size: 18px; font-weight: 600;">Need
                                    to reach me faster?</h3>
                                <p style="margin: 0; color: #666; font-size: 14px;">Feel free to contact me directly
                                    through any of these channels:</p>
                            </div>

                            <!-- Contact buttons -->
                            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                    <td align="center">
                                        <table role="presentation" cellpadding="0" cellspacing="0"
                                            style="display: inline-table;">
                                            <tr>
                                                <td style="padding: 5px;">
                                                    <a href="mailto:your.email@example.com">
                                                        Email</a>
                                                </td>
                                                <td style="padding: 5px;">
                                                    <a href="tel:+1234567890">
                                                        Phone</a>
                                                </td>
                                                <td style="padding: 5px;">
                                                    <a href="https://wa.me/1234567890"> WhatsApp</a>
                                                </td>
                                            </tr>
                                        </table>
                                    </td>
                                </tr>
                            </table>
                        </td>
                    </tr>
                </table>

                <!-- Footer note -->
                <div
                    style="text-align: center; margin-top: 25px; padding-top: 20px; border-top: 1px solid rgba(0,0,0,0.1);">
                    <p style="margin: 0; font-size: 12px; color: #999; line-height: 1.4;">This is an
                        automated confirmation email from your portfolio inquiry form.<br>Please do not reply to this email directly.
                    </p>
                </div>
            </td>
        </tr>

    </table>
    </td>
    </tr>
    </table>

    <style>
        @media screen and (max-width: 650px) {
            .email-container {
                width: 100% !important;
                margin: 10px !important;
            }

            .email-header {
                padding: 30px 20px !important;
            }

            .email-content {
                padding: 30px 20px !important;
            }

            .email-footer {
                padding: 25px 20px !important;
            }

            .contact-buttons td {
                display: block !important;
                padding: 3px 0 !important;
            }

            .contact-buttons a {
                width: 100% !important;
                text-align: center !important;
                margin: 2px 0 !important;
            }

            h1 {
                font-size: 24px !important;
            }

            .info-label {
                width: 80px !important;
            }
        }

        @media screen and (max-width: 480px) {
            .email-header {
                padding: 25px 15px !important;
            }

            .email-content {
                padding: 25px 15px !important;
            }

            .email-footer {
                padding: 20px 15px !important;
            }

            h1 {
                font-size: 22px !important;
            }

            .gradient-box {
                padding: 20px !important;
                margin: 20px 0 !important;
            }
        }
    </style>

</body>

</html>`;

        const replacements = {
            "{{name}}": data.name,
            "{{email}}": data.email,
            "{{phone}}": data.phone,
            "{{message}}": data.message,
        };

        Object.entries(replacements).forEach(
            ([placeholder, value]) =>
                (htmlTemplate = htmlTemplate.replace(
                    new RegExp(placeholder, "g"),
                    value
                ))
        );

        const result = await sendEmail({
            to: [{ email: data.email, name: data.name }],
            subject: "Thank You for Your Enquiry - DigiCraft",
            htmlContent: htmlTemplate,
        });

        return result;
    } catch (error) {
        console.error("Error sending enquiry confirmation email:", error);
        return {
            success: false,
            data: null,
            message: "Failed generating or sending confirmation email",
        };
    }
}
