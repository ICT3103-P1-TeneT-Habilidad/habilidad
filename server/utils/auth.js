import bcrypt from 'bcrypt'
import crypto from 'crypto'
import { generateTokens } from '../utils/jwt.js'

export const generateSalt = (num) => {
    return bcrypt.genSaltSync(num)
}

export const hashText = (text, salt) => {
    return bcrypt.hashSync(text, salt)
}

export const verifyPassword = (password, dbPassword) => {
    return bcrypt.compareSync(password, dbPassword)
}

export const generateTokenProcedure = async (user) => {
    // Generate uuid
    const jti = crypto.randomUUID()

    const userId = user.userId

    // Generate Token
    const { accessToken, refreshToken } = generateTokens(userId, jti)

    return {
        accessToken,
        refreshToken,
        jti
    }
}