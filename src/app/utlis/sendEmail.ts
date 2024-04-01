import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: config.node_Env === 'production',
    auth: {
      user: config.smtp_email,
      pass: config.smtp_password,
    },
  });

  await transporter.sendMail({
    from: 'rupashi.bangla.club@gmail.com', // sender address
    to: to, // list of receivers
    subject: 'Please Reset Your Password', // Subject line
    text: 'Reset Your Password within 10 min', // plain text body
    html, // html body
  });
};
