import nodemailer from "nodemailer";
import { MailAdapter, SendMailDTO } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "133f45d115d5aa",
    pass: "527a0c61aa0c2a"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailDTO): Promise<void> {
    await transport.sendMail({
      from: "Equipe Feedget <oi@feedget.com>",
      to: "Leandro Crispim <leandrocrispim891@gmail.com>",
      subject,
      html: body
    })
  }
}