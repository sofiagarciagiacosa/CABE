import nodemailer from "nodemailer";

// transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// función para enviar mail
export const sendResetEmail = async (to, link) => {
  await transporter.sendMail({
    from: `"Cabe Agencia" <${process.env.MAIL_USER}>`,
    to,
    subject: "Recuperar contraseña",
    html: `
      <h2>Recuperar contraseña</h2>
      <p>Hacé click en el siguiente enlace para cambiar tu contraseña:</p>
      <a href="${link}">Cambiar contraseña</a>
      <p>Si no solicitaste esto, ignorá este correo.</p>
    `,
  });
};
