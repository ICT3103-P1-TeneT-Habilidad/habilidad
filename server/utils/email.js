import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config({ path: '../.env' })

const user = process.env.EMAIL
const password = process.env.EMAIL_PWD
const service = 'gmail'

export const sendEmailLink = async (receiverEmail, subject, text) => {
    try {
        const transport = nodemailer.createTransport({
            service: service,
            auth: {
                user: user,
                pass: password,
            },
        })

        await transport.sendMail({
            from: user,
            to: receiverEmail,
            subject: subject,
            text: text,
        })
    } catch (err) {
        console.log(err)
    }
}
