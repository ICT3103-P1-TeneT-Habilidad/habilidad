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

export const verifyAccessToken = async () =>
    new Promise((res, rej) => {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        res(payload)
    })

export const verifyRefreshToken = async () =>
    new Promise((res, rej) => {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        res(payload)
    })
