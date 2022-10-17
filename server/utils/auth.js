import bcrypt from 'bcrypt'

export const generateSalt = (num) => {
    return bcrypt.genSaltSync(num)
}

export const hashText = (text, salt) => {
    return bcrypt.hashSync(text, salt)
}

export const verifyPassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword)
}
