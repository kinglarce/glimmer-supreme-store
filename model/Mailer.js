const nodemailer = require('nodemailer');
const DEFAULT_MAILING_LIST = 'example1@vultr.com,example2@vultr.com';
const SENDER_EMAIL = 'anastasia.roob18@ethereal.email';
const SENDER_PASS = 'tqjbzuaapRpvdtgC3s';
const FROM = 'do_not_reply@northpole.com';
const TO = 'santa@northpole.com';

const getMailBody = (data) => {
  const { username, address, wish } = data;
  return `
    <div>Hi Santa!</div>
    <div>This is from ${username} from ${address}</div>
    <div>${wish}</div>
  `;
};

const sendMail = (data) => {
  if (!data) return;
  try {
    const subject = `A wish from ${data.username}`;
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
      to: TO,
      subject,
      text: subject,
      html: getMailBody(data),
    };

    transporter.sendMail(message, () => {});
  } catch (e) {
    console.error(error);
  }
};

module.exports = {
  sendMail,
};
