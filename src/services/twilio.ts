import Config from "../config";
import nodemailer from 'nodemailer';
import twilio from "twilio";

const twilioApi = twilio(Config.TWILIO_ACCOUNT_ID, Config.TWILIO_TOKEN);

const owner = {
  name: Config.GMAIL_NAME,
  address: Config.GMAIL_EMAIL,
};

const gmailTransporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: Config.GMAIL_EMAIL,
    pass: Config.GMAIL_PASSWORD,
  },
});

export const notifyNewUserByEmail = async (userData: any) => {
  const mailOptions = {
    from: owner,
    to: Config.GMAIL_EMAIL,
    subject: 'Nuevo usuario creado',
    html: `Un nuevo usuario fue creado. Sus datos son: ${userData}`,
  };

  const response = await gmailTransporter.sendMail(mailOptions);
  return response;
};

export const notifyNewOrderByWpp = async (orderData: any) => {
  const params = {
    body: `Una nueva orden fue creada: ${orderData}`,
    from: `whatsapp:${Config.TWILIO_WPP_CELLPHONE}`,
    to: `whatsapp:${Config.ADMIN_PHONE}`,
  };

  const response = await twilioApi.messages.create(params);
  return response;
};

