const nodemailer = require('nodemailer');
const FROM = 'do_not_reply@northpole.com';
const TO = 'santa@northpole.com';
const SENDER_EMAIL = process.env.EMAIL_CLIENT_SENDER_EMAIL;
const SENDER_PASS = process.env.EMAIL_CLIENT_SENDER_PASSWORD;

const setTransporter = () => nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASS,
  },
});

const getBody = (data) => {
  const { username, address, wish } = data;
  return `
    <div>Hi Santa!</div>
    <div>This is ${username} from ${address}.</div>
    <br>
    <div>${wish}</div>
  `;
};

const getRandomId = () => Math.random().toString(36).substring(7);

const send = (data) => {
  if (!data) return;
  const correlationId = getRandomId();
  try {
    console.log(`Correlation ID ${correlationId}: Initializing email sender`);
    if (!SENDER_EMAIL || !SENDER_PASS) throw new Error('Invalid credentials.');

    const { username } = data;
    const subject = `A wish from ${username}`;
    const transporter = setTransporter();

    const message = {
      from: `Cute Kid <${FROM}>`,
      to: `Santa <${TO}>`,
      subject,
      text: subject,
      html: getBody(data),
    };

    console.log(`Correlation ID ${correlationId}: Sending email`);
    transporter.sendMail(message, () => {});
    console.log(`Correlation ID ${correlationId}: Successfully sent email for user ${username}`);
  } catch (error) {
    console.error(`Correlation ID ${correlationId}: ${error}`);
  }
};

module.exports = {
  send,
};
