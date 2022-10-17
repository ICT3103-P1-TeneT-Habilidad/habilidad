import crypto from 'crypto'
import { Response } from '../utils/response.js'
import { findAccountByEmail, storeNewAccount, findAccountByUsername, findUserbyUserId } from '../services/user.js'
import { generateSalt, hashText, verifyPassword } from '../utils/auth.js'
import { decodeToken, generateTokens } from '../utils/jwt.js'
import { addRefreshTokenToWhitelist } from '../services/auth.js'
import jwt from 'jsonwebtoken'

const generateTokenProcedure = async () => {

    // Generate uuid
    const jti = crypto.randomUUID();


    const userId = account.user.userId

    // Generate Token
    const { accessToken, refreshToken } = generateTokens(userId, jti);


    // Whitelist refresh token (store in db)
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId });


    return {
        accessToken,
        refreshToken,
    };
}

export const getUser = async (req, res, next) => {

    try {

        const { accessToken } = req.body
        const userId = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET).userId

        const user = await findUserbyUserId(userId)

        res.json(user)

    } catch (err) {
        err = new Response(err)
        next(err)
    }

}

// export const getUser = async (req, res, next) => {
//     const users = await prisma.user.findMany();
//     if(users){
//         res.status(res_ok).json(users)
//     }
// }

export const userLogin = async (req, res, next) => {

    try {

        const { username, password } = req.body

        // Verify email
        const account = await findAccountByUsername(username)

        if (!account) {
            res.status(401)
            throw new Error('Wrong username or password.')
        }

        // Verify password
        const result = verifyPassword(password, account.password)

        if (!result) {
            res.status(401)
            throw new Error('Wrong username or password.')
        }

        // Process of generating tokens
        const { accessToken, refreshToken } = await generateTokenProcedure()

        res.json({
            accessToken,
            refreshToken,
        });

    } catch (err) {
        // const err = new Response('userLogin not implemented', 'res_notImplemented')
        // next(err)    
        err = new Response(err)
        next(err)
    }

}

export const userLogout = async (req, res, next) => {
    const err = new Response('userLogout not implemented', 'res_notImplemented')
    next(err)
}

export const userRegister = async (req, res, next) => {
    try {
        const { email, password, username, phoneNumber, name, role } = req.body
        if (!email || !password) {
            res.status(400)
            throw new Error('You must provide an email and a password.')
        }

        // check if this email can be used
        const existingUser = await findAccountByEmail(email)

        if (existingUser) {
            res.status(400)
            throw new Error('Email already in use.')
        }

        // Hash password and store to DB
        const hashedPassword = hashText(password, generateSalt(12))
        const account = await storeNewAccount({ email, hashedPassword, username, phoneNumber, name, role });

        // Process of generating tokens
        const { accessToken, refreshToken } = await generateTokenProcedure()

        res.json({
            accessToken,
            refreshToken,
        });
    } catch (err) {
        err = new Response(err)
        next(err)

    }

}

export const updateUser = async (req, res, next) => {
    const err = new Response('updateUser not implemented', 'res_notImplemented')
    next(err)
}

export const userVerify = async (req, res, next) => {
    const err = new Response('userVerify not implemented', 'res_notImplemented')
    next(err)
}