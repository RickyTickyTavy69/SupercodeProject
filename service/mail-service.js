import nodemailer from "nodemailer";

class MailService {
  constructor() {
    // Данные от gmail, по которым будут отправлятьяс email.
    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: "true",
      auth: {
        user: "bakirovartem69@gmail.com",
        pass: "oscejpfnuryaylxz",
      },
    });
  }

  async sendActivationMail(to, link) {
    console.log("sending activation email...");
    await this.transporter.sendMail({
      from: "bakirovartem69@gmail.com",
      to,
      subject: "Активируйте Ваш аккунт, пожалуйста!",
      text: "",
      html: `
        <div>
          <h1>сПасИба зА рИгиСтрАциЮ нА нАшИм сАиТе</h1>
          <h2>кЛиКниТи Н сЫЫлку чтОбы АкТивИроВат аКант</h2>
          <p>
            <strong style="font-size: 1.4em">ССЛК:</strong><span style="font-size: 1.4em"><a href="${link}"></a>${link}</span>
          </p>
        </div>
      `,
    });
  } // функция, которая отправляет email для активации аккаунта пользователю.
}

export default new MailService();
