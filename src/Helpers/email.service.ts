import nodemailer, { Transporter } from "nodemailer";


class EmailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      service: "Gmail",
      port: Number(process.env.SMTP_PORT),
      secure: false, // Use TLS
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendEmail(
    to: string,
    subject: string,
    text: string,
    html?: string
  ): Promise<void> {
    try {
      const info = await this.transporter.sendMail({
        from: `"${process.env.EMAIL_NAME}" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
        html,
      });

    } catch (error) {
      console.error("Error sending email: ", error);
      throw new Error("Email could not be sent");
    }
  }
  async sendVerificationEmail(to: string, token: string): Promise<void> {
    const verifyLink = `${process.env.App_URL}/auth/verify-email?token=${token}`;
    await this.transporter.sendMail({
      from: `"TodoTask" <${process.env.SMTP_USER}>`,
      to,
      subject: "Verify Your Email",
      html: `<p>Click <a href="${verifyLink}">here</a> to verify your email at TodoTask.</p>`,
    });
  }
}

export default new EmailService();