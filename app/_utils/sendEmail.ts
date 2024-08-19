import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";

type SendEmailProps = {
  to: string;
  subject: string;
  html: string;
};

export default async function sendEmail({ to, subject, html }: SendEmailProps) {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_TOKEN || "",
  });

  const sentFrom = new Sender(
    "useGuitar@trial-z86org865nn4ew13.mlsender.net",
    "useGuitar"
  );

  const recipients = [new Recipient(to, "")];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setReplyTo(sentFrom)
    .setSubject(subject)
    .setHtml(html);

  await mailerSend.email.send(emailParams);
}
