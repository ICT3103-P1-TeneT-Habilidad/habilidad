import crypto from 'crypto'
import { Response } from '../utils/response.js'
import { findAccountByEmail, storeNewAccount, findAccountByUsername, findUserbyUserId } from '../services/user.js'
import { generateSalt, hashText, verifyPassword } from '../utils/auth.js'
import { decodeToken, generateTokens } from '../utils/jwt.js'
import { addRefreshTokenToWhitelist } from '../services/auth.js'
import jwt from 'jsonwebtoken'
import { responseCode } from '../utils/responseCode.js'
import { sendEmailLink } from '../utils/email.js'

const generateTokenProcedure = async (account) => {
    // Generate uuid
    const jti = crypto.randomUUID()

    const userId = account.user.userId

    // Generate Token
    const { accessToken, refreshToken } = generateTokens(userId, jti)

    // Whitelist refresh token (store in db)
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId })

    return {
        accessToken,
        refreshToken,
    }
}

export const getUser = async (req, res, next) => {
    try {
        const { userId } = req.payload

        const result = await findUserbyUserId(userId)

        res.status(responseCode.res_ok).json({
            result,
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
            throw new Response('Wrong credentials', 'res_unauthorised')
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
            },
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
        const account = await storeNewAccount({ email, hashedPassword, username, phoneNumber, name, role })

        // Process of generating tokens
        const { accessToken, refreshToken } = await generateTokenProcedure(account)

        res.status(responseCode.res_ok).json({
            result: {
                accessToken,
                refreshToken,
            },
        })
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

export const sendEmailResetLink = async (req, res) => {
    try {
        const email = req.body.user_email
        // const { error } = email.validate(req.body)
        // if (error) return res.status(responseCode.res_badRequest).send(error.details[0].message)
        
        const user = await findAccountByEmail(email)
        console.log(user)

        if (!user) return res.status(responseCode.res_badRequest).send("User with given email doesn't exist")

        // let token = await Token.findOne({ user_id: user._id })
        // if (!token) {
        //     token = await new Token({
        //         user_id: user._id,
        //         token: crypto.randomBytes(32).toString('hex'),
        //     }).save()
        // }

        const token = crypto.randomBytes(32).toString('hex')

        const emailMsg =
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
            `http://localhost:5000/api/users/resetPassword/${token.token}\n\n` +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'

        await sendEmailLink(email, 'Password reset', emailMsg)

        res.status(responseCode.res_ok).json({
            status: 'Password reset link sent to your email account',
        })
    } catch (err) {
        res.status(responseCode.res_internalServer).json({
            status: 'Failed to send reset link',
            message: err.message,
        })
    }
}
