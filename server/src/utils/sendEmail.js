import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, html }) => {
  // We use Mailtrap or an SMTP like Gmail/SendGrid for sending emails
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const mailOptions = {
    from: '"SevaSarathi Admin" <noreply@sevasarathi.com>',
    to,
    subject,
    html,
  };

  await transporter.sendMail(mailOptions);
};