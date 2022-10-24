import crypto from 'crypto'
import { Response } from '../utils/response.js'
import { findAccountByEmail, storeNewAccount, findAccountByUsername, findUserbyUserId } from '../services/user.js'
import { generateSalt, hashText, verifyPassword } from '../utils/auth.js'
import { decodeToken, generateTokens } from '../utils/jwt.js'
import { addRefreshTokenToWhitelist } from '../services/auth.js'
import jwt from 'jsonwebtoken'
import { responseCode } from '../utils/responseCode.js'

const generateTokenProcedure = async (account) => {

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

        const { userId } = req.payload

        const result = await findUserbyUserId(userId)

        res.status(responseCode.res_ok).json({
            result
        })

    } catch (err) {
        err = new Response(err)
        next(err)
    }

}
export const userDeactivate = async (req, res, next) => {

    try {

        const { userId } = req.payload

        const result = await userDeactivate(userId)

        res.status(responseCode.res_ok).json({
            result
        })

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
            throw new Response('Wrong username or password', 'res_unauthorised')
        }

        // Verify password
        const result = verifyPassword(password, account.password)

        if (!result) {
            throw new Response('Wrong username or password', 'res_unauthorised')
        }

        // Process of generating tokens
        const { accessToken, refreshToken } = await generateTokenProcedure(account)

        res.status(responseCode.res_ok).json({
            result: {
                accessToken,
                refreshToken,
            }
        })

    } catch (err) {
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
            throw new Response('Missing email or password.', 'res_badRequest')
        }

        // check if this email can be used
        const existingUser = await findAccountByEmail(email)

        if (existingUser) {
            throw new Response('Email already in use.', 'res_badRequest')
        }

        // Hash password and store to DB
        const hashedPassword = hashText(password, generateSalt(12))
        const account = await storeNewAccount({ email, hashedPassword, username, phoneNumber, name, role });

        // Process of generating tokens
        const { accessToken, refreshToken } = await generateTokenProcedure(account)

        res.status(responseCode.res_ok).json({
            result: {
                accessToken,
                refreshToken,
            }
        });
    } catch (err) {
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