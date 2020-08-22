const nodemailer = require('nodemailer');
const SENDER_EMAIL = 'anastasia.roob18@ethereal.email';
const SENDER_PASS = 'tqjbzuaapRpvdtgC3s';
const FROM = 'do_not_reply@northpole.com';
const TO = 'santa@northpole.com';

const getBody = (data) => {
  const { username, address, wish } = data;
  return `
    <div>Hi Santa!</div>
    <div>This is from ${username} from ${address}</div>
    <div>${wish}</div>
  `;
};

const getRandomId = () => Math.random().toString(36).substring(7);

const send = (data) => {
  if (!data) return;
  const correlationId = getRandomId();
  try {
    console.log(`Correlation ID ${correlationId}: Initiating email sender`);
    const { username } = data;
    const subject = `A wish from ${username}`;
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      auth: {
        user: SENDER_EMAIL,
        pass: SENDER_PASS,
      },
    });

    const message = {
      from: `Cute Kid <${FROM}>`,
      to: `Santa <${TO}>`,
      subject,
      text: subject,
      html: getBody(data),
    };

    transporter.sendMail(message, () => {});
    console.log(`Correlation ID ${correlationId}: Successfully sent email for user ${username}`);
  } catch (e) {
    console.error(`Correlation ID ${correlationId}: ${error}`);
  }
};

module.exports = {
  send,
};
