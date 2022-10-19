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

export const verifyAccessToken = (token) => {
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, user) => {

        if (err) return res.sendStatus(403)

        req.user = user

        next()
    })
}