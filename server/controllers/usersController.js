// import services
import {
    findUserbyUserId,
    findUserByEmail,
    updateDeactivateDate,
    findUserByUsername,
    updateUserByUserId,
    storeNewUser,
    findAllUsers,
    updateDeactivationDateToNull,
} from '../services/user.js'
import { findEmailToken, replaceEmailToken, saveEmailToken } from '../services/emailToken.js'
// import constants
import { email_template, email_template_deactivate } from '../constants.js'
import jwt from 'jsonwebtoken'

// import middleware
import { generateSalt, hashText, verifyPassword, generateTokenProcedure } from '../utils/auth.js'
import { sendEmailLink, generateEmailToken, decodeEmailToken } from '../middleware/email.js'
// import validations
import { validateEmail, validatePasswords } from '../validations/input.js'
// import Responses
import { responseCode } from '../responses/responseCode.js'
import { Response } from '../responses/response.js'
import { getErrorResponse } from '../utils/error.js'
import { addRefreshTokenToWhitelist, deleteRefreshTokenByUserId } from '../services/refreshTokens.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const result = await findAllUsers()

        res.status(responseCode.res_ok).json({
            status: responseCode.res_ok,
            data: result,
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}

export const getOneUser = async (req, res, next) => {
    try {
        const { userId } = req.payload

        const result = await findUserbyUserId(userId)

        res.status(responseCode.res_ok).json({
            result,
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}
export const deactivateUser = async (req, res, next) => {
    try {
        const { userId } = req.payload

        const result = await updateDeactivateDate({ userId })

        next()
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { username, password } = req.body

        // Verify email
        const user = await findUserByUsername(username)

        if (!user) {
            throw new Response('Wrong credentials', 'res_unauthorised')
        }

        // Verify password
        const result = verifyPassword(password, user.password)

        if (!result) {
            throw new Response('Wrong username or password', 'res_unauthorised')
        }

        // Process of generating tokens
        const { accessToken, refreshToken, jti } = await generateTokenProcedure(user)
        const { userId } = user
        // Whitelist refresh token (store in db)
        await deleteRefreshTokenByUserId(userId)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId })

        res.status(responseCode.res_ok).json({
            result: {
                accessToken,
                refreshToken,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
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
        const existingUser = await findUserByUsername(username)

        if (existingUser) {
            throw new Response('Email already in use.', 'res_badRequest')
        }

        // Hash password and store to DB
        const hashedPassword = hashText(password, generateSalt(12))
        const user = await storeNewUser({ email, hashedPassword, username, phoneNumber, name, role })

        // Process of generating tokens
        const { accessToken, refreshToken, jti } = await generateTokenProcedure(user)
        const { userId } = user
        // Whitelist refresh token (store in db)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId })

        res.status(responseCode.res_ok).json({
            result: {
                accessToken,
                refreshToken,
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}

export const updateUser = async (req, res, next) => {


    try {
        const { userId } = req.payload
        const { password, phoneNumber, email, name } = req.body

        const hashedPassword = hashText(password, generateSalt(12))
        const user = await updateUserByUserId({
            userId,
            email,
            hashedPassword,
            email,
            name,
            phoneNumber,
        })

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'success'
            },
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
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
            throw new Response('Invalid link', 'res_internalServer')
        }

        const { username } = await findUserbyUserId(userId)

        // delete token + update password
        const hashedPassword = hashText(password, generateSalt(12))
        const result = await updatePasswordAndDeleteToken({ userId, hashedPassword, username })

        if (result.length > 0) {
            // return result
            res.status(responseCode.res_ok).json({
                status: 'Password reset sucessfully',
            })
        } else {
            throw new Response('Failed to reset password', 'res_internalServer')
        }
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}

export const sendEmailResetLink = async (req, res, next) => {
    try {
        const email = req.body.email
        const user = await findUserByEmail(email)

        if (user.length != 1) throw new Response('Internal Server Error', 'res_internalServer')

        if (!user) return res.status(responseCode.res_badRequest).send("User with given email doesn't exist")

        let token = await findEmailToken(user[0].userId)

        const currentDate = new Date(Date.now())
        const expiredDate = new Date(currentDate + 1 * (60 * 60 * 1000))

        if (!token) {
            token = generateEmailToken(user[0].userId)
            const result = await saveEmailToken({
                userId: user[0].userId,
                token: token,
                expiredAt: expiredDate,
            })
        }

        if (token.expiredAt > token.createdAt) {
            token = generateEmailToken(user[0].userId)
            const result = await replaceEmailToken({
                userId: user[0].userId,
                token: token,
                expiredAt: expiredDate,
                updatedAt: currentDate,
            })
        } else if (token.expiredAt < token.createdAt) {
            throw new Response('Invalid Link', 'res_unauthorised')
        }

        const emailMsg = email_template(token)

        await sendEmailLink(email, 'Password reset', emailMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'Password reset link sent to your email account',
            }
        })
    } catch (err) {
        const error = getErrorResponse(err, responseCode.res_internalServer, 'Failed to send reset link')
        console.log(error)
        next(error)
    }
}

export const sendEmailDeactivateAcc = async (req, res, next) => {
    try {
        const email = req.body.email

        if (!email) throw new Response('Email field is empty', 'res_badRequest')

        const user = await findUserByEmail(email)

        console.log(user)
        if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

        const emailMsg = email_template_deactivate

        await sendEmailLink(email, 'Deactivate Account', emailMsg)

        res.status(responseCode.res_ok).json({
            status: responseCode.res_ok,
            message: 'Account has been deactivated',
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
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

export const reactivateUser = async (req, res, next) => {
    try {
        const userId = req.body.userId

        const result = await updateDeactivationDateToNull({ userId })

        if (!result) throw new Response('Fail to reactivate account', 'res_badRequest')

        res.status(responseCode.res_ok).json({
            message: 'Reactivate acccount sucessfully',
            status: responseCode.res_ok
        })
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}
