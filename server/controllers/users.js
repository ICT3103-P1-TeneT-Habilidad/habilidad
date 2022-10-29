import crypto from 'crypto'
// import services
import { addRefreshTokenToWhitelist } from '../services/auth.js'
import { findUserbyUserId, findUserByEmail, storeNewUser } from '../services/user.js'
import { findAccountByUsername, updatePasswordAndDeleteToken } from '../services/account.js'
import { findEmailToken, replaceEmailToken, saveEmailToken } from '../services/token.js'

// import constants
import { email_template } from '../constants.js'
import jwt from 'jsonwebtoken'

// import middleware
import { generateSalt, hashText, verifyPassword } from '../utils/auth.js'
import { sendEmailLink, generateEmailToken, decodeEmailToken } from '../utils/email.js'
import { generateTokens } from '../utils/jwt.js'
// import validations
import { validateEmail, validatePasswords } from '../validations/input.js'
// import Responses
import { responseCode } from '../responses/responseCode.js'
import { Response } from '../responses/response.js'

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

        // check if this username can be used
        const existingUser = await findAccountByUsername(username)

        if (existingUser) {
            throw new Response('Email already in use.', 'res_badRequest')
        }

        // Hash password and store to DB
        const hashedPassword = hashText(password, generateSalt(12))
        const account = await storeNewUser({ email, hashedPassword, username, phoneNumber, name, role })

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

export const resetPassword = async (req, res, next) => {
    try {
        const { token } = req.params
        const { password } = req.body
        let userId
        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {

            if (err) throw new Response('Token invalid', 'res_forbidden')
            const token = decodeEmailToken(req.params.token)

            userId = user.userId

        })

        // verify token in db
        const verifyToken = await findEmailToken(userId, token)

        if (!verifyToken) {
            throw new Response("Invalid link", 'res_internalServer')
        }

        const { accountId, username } = await findUserbyUserId(userId)

        // delete token + update password
        const hashedPassword = hashText(password, generateSalt(12))
        const result = await updatePasswordAndDeleteToken({ accountId, userId, hashedPassword, username })

        if (result.length > 0) {
            // return result
            res.status(responseCode.res_ok).json({
                status: 'Password reset sucessfully',
            })
        } else {
            throw new Response('Failed to reset password', 'res_internalServer')
        }

    } catch (err) {
        next(err)
    }
}

export const sendEmailResetLink = async (req, res) => {
    try {
        const email = req.body.user_email

        const user = await findUserByEmail(email)

        if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

        let token = await findEmailToken(user[0].userId)

        let expiredAt
        let issueAt

        // No valid email token in db
        if (!token) {
            token = generateEmailToken({ userId: user[0].userId })
            const tokenPayload = decodeEmailToken(token)
            expiredAt = new Date(tokenPayload.exp * 1000)
            await saveEmailToken({
                userId: user[0].userId,
                token: token,
                expiredAt: expiredAt,
            })
        }
        // Has valid email token in db
        else {
            token = generateEmailToken({ userId: user[0].userId })
            const tokenPayload = decodeEmailToken(token)
            expiredAt = new Date(tokenPayload.exp * 1000)
            issueAt = new Date(tokenPayload.iat * 1000)
            await replaceEmailToken({
                userId: user[0].userId,
                token: token,
                expiredAt: expiredAt,
                updatedAt: issueAt,
            })
        }

        console.log(token)
        const emailMsg = email_template(token)

        await sendEmailLink(email, 'Password reset', emailMsg)

        res.status(responseCode.res_ok).json({
            status: 'Password reset link sent to your email account',
        })
    } catch (err) {
        next(err)
    }
}
export const validateEmailAndPassword = async (req, res, next) => {
    await Promise.all([validateEmail(req), validatePasswords(req)])
        .then((value) => {
            req.validate = {
                status: true,
            }
        })
        .catch((reject) => {
            req.validate = {
                status: false,
                message: reject,
            }
        })
    next()
}
