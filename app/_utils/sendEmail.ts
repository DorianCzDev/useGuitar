import nodemailer from "nodemailer";
import nodemailerConfig from "./nodemailerConfig";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export default async function sendEmail({ to, subject, html }: SendEmailProps) {
  const transporter = nodemailer.createTransport(nodemailerConfig);

  return transporter.sendMail({
    from: '"useGuitar support" <useguitar.noreply@gmail.com>',
    to,
    subject,
    html,
  });
}
