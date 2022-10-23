import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'

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

export const generateEmailToken = (user) => {
    try {
        return jwt.sign(user, process.env.SECRET_KEY)
    } catch (err) {
        console.log(err)
    }
}
