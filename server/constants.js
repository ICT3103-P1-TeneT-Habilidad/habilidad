import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

export const prod_url = 'https://habilidad.tk'

export const dev_url = 'http://172.16.1.3:5000'

export const email_template = (token) =>
    'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
    'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
    `http://172.16.1.3:5000/api/users/resetPassword/${token}\n\n` +
    'If you did not request this, please ignore this email and your password will remain unchanged.\n'

export const email_template_deactivate = 'This account has been successfully deactivated as of ' + new Date() + "\n\n" +
    'If you wish to reactivate your account, please contact our support at testingpurposes706@gmail.com within 30 days \n\n' +
    'After 30 days your account will no longer be able to be reactivated'

export const otp_template = (token) =>
    `Habilidad: Your one-time passcode for login is ${token}`
