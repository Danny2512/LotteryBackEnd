import nodemailer from 'nodemailer';
import path from 'path';
import config from "../../config/default";

class EmailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.smpt_host,
      port: parseInt(config.smpt_port),
      secure: config.smpt_secure === 'true',
      auth: {
        user: config.smpt_user,
        pass: config.smpt_pass,
      },
      secureProtocol: 'TLSv1_2_method'
    });
  }

  async sendEmail(toEmails, toName, subject, renderedTemplate, fileAttachments = []) {
    try {
        const emailOptions = {
        from: toName,
        to: toEmails.join(', '), // Convierte la lista de direcciones a un formato de cadena
        subject: subject,
        html: renderedTemplate,
        attachments: Array.isArray(fileAttachments) ? fileAttachments.map((filePath) => ({
            filename: path.basename(filePath),
            path: filePath,
            })) : [], 
        };

        const info = await this.transporter.sendMail(emailOptions);
        return { message: 'Email enviado exitosamente', isError: 0 };
    } catch (error) {
        throw error;
    }
  }
}

export default EmailService;