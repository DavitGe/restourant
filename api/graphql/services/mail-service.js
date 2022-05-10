require('dotenv').config()
const nodemailer = require('nodemailer')

class mailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    })
  }
  async sendActivationMail(link, to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Activation of accaunt on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>for activation click the button</h1>
          <a href="${link}">Activate</a>
        </div>
      `,
    })
  }
  async sendRestoreMail(link, to) {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: 'Restore of accaunt on ' + process.env.API_URL,
      text: '',
      html: `
        <div>
          <h1>for changins password click the button</h1>
          <a href="${link}">Restore account</a>
        </div>
      `,
    })
  }
}

module.exports = new mailService()
