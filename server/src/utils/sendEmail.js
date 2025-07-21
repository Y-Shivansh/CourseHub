import nodemailer from 'nodemailer';

export const sendEmail = async({to, subject, html}) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL_USER, // kis se email aayi hai (your Gmail)
        to, subject, html
    }

    await transporter.sendMail(mailOptions);
}