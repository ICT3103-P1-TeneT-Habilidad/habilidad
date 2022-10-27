import dotenv from 'dotenv'

dotenv.config({ path: './.env' })

export const prod_url = 'https://habilidad.tk'

export const dev_url = 'http://localhost:5000'

export const email_template = (token) => 
'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
`http://localhost:5000/api/users/resetPassword/${token}\n\n` +
'If you did not request this, please ignore this email and your password will remain unchanged.\n'