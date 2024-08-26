export default {
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_ADDRESS,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
};
