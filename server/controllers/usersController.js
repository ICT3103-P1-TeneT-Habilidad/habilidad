// import services
import {
    findUserbyUserId,
    findUserByEmail,
    updateDeactivateDate,
    findUserByUsername,
    updateUserByUserId,
    storeNewUser,
    findAllUsers,
    updateDeactivationDateToNull
} from '../services/user.js'
import { findEmailToken, replaceEmailToken, saveEmailToken } from '../services/emailToken.js'
// import constants
import { email_template, email_template_deactivate, otp_template } from '../constants.js'
import jwt from 'jsonwebtoken'

// import middleware
import { generateSalt, hashText, verifyPassword, generateTokenProcedure } from '../utils/auth.js'
import { sendEmailLink, generateEmailToken, decodeEmailToken, generateEmailOtp } from '../middleware/email.js'
// import validations
import { validateEmail, validatePasswords } from '../validations/input.js'
// import Responses
import { responseCode } from '../responses/responseCode.js'
import { Response } from '../responses/response.js'
import { getErrorResponse } from '../utils/error.js'
import { addRefreshTokenToWhitelist, deleteRefreshTokenByUserId } from '../services/refreshTokens.js'
import {
    createNewOTP, deleteOtpByEmail, deleteOtpById, findOtpTokenByUsername
} from '../services/otpToken.js'
// logs
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'

export const getAllUsers = async (req, res, next) => {
    try {
        const result = await findAllUsers()

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ status: responseCode.res_ok, data: result, })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const getOneUser = async (req, res, next) => {
    try {
        const { userId } = req.payload

        const result = await findUserbyUserId(userId)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ result })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}
export const deactivateUser = async (req, res, next) => {
    try {
        const { userId } = req.payload

        const result = await updateDeactivateDate({ userId })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        next()
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const userLogin = async (req, res, next) => {
    try {
        const { password } = req.body
        const { username } = req.sanitizedBody

        // Verify email
        const user = await findUserByUsername(username)

        if (!user) {
            throw new Response('Wrong username or password', 'res_unauthorised')
        }

        // Verify password
        const result = verifyPassword(password, user.password)

        if (!result) {
            throw new Response('Wrong username or password', 'res_unauthorised')
        }

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        // Go to send email OTP
        next()

    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const userLogout = async (req, res, next) => {
    try {

        const { userId } = req.payload
        await deleteRefreshTokenByUserId(userId)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ result: { status: responseCode.res_ok, message: 'success' } })

    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const userRegister = async (req, res, next) => {
    try {
        const { status, message } = req.validate

        if (!status) throw new Response(`${message}`, 'res_badRequest')

        const { email, password, username, phoneNumber, name, role, confirmedPassword } = req.body
        if (password !== confirmedPassword) {
            throw new Response('Passwords do not match.', 'res_badRequest')
        }

        // check if this username can be used
        const existingUser = await findUserByUsername(username)

        if (existingUser) {
            throw new Response('Email already in use.', 'res_badRequest')
        }

        // Hash password and store to DB
        const hashedPassword = hashText(password, generateSalt(12))
        const user = await storeNewUser({ email, hashedPassword, username, phoneNumber, name, role })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ result: { status: responseCode.res_ok, message: 'success' } })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const updateUser = async (req, res, next) => {

    try {
        const { userId } = req.payload
        const { password, phoneNumber, email, name, confirmedPassword } = req.body

        if (password !== confirmedPassword) {
            throw new Response('Passwords do not match.', 'res_badRequest')
        }

        await validatePasswords(req).catch((reject) => {
            throw new Response(reject, 'res_badRequest')
        })

        const hashedPassword = hashText(password, generateSalt(12))
        const user = await updateUserByUserId({
            userId,
            email,
            hashedPassword,
            email,
            name,
            phoneNumber,
        })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ result: { status: responseCode.res_ok, message: 'success' } })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

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

            const logMsg = new LogMessage(200, req)
            logger.log(logMsg)

            res.status(responseCode.res_ok).json({ result: { status: responseCode.res_ok, message: 'success' } })

        } else {
            throw new Response('Failed to reset password', 'res_internalServer')
        }
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

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

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                message: 'Password reset link sent to your email account',
            }
        })
    } catch (err) {
        const error = getErrorResponse(err, 'res_internalServer', 'Failed to send reset link')

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const sendEmailDeactivateAcc = async (req, res, next) => {
    try {
        const email = req.body.email

        if (!email) throw new Response('Email field is empty', 'res_badRequest')

        const user = await findUserByEmail(email)

        if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

        const emailMsg = email_template_deactivate

        await sendEmailLink(email, 'Deactivate Account', emailMsg)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            status: responseCode.res_ok,
            message: 'Account has been deactivated',
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}
export const validateEmailAndPassword = async (req, res, next) => {
    try {
        const { email, password, username, phoneNumber, name, role, confirmedPassword } = req.body
        if (!email || !password || !username || !phoneNumber || !name || !role || !confirmedPassword) {
            throw new Response('Form incomplete.', 'res_badRequest')
        }

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

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        next()
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)

    }
}

export const reactivateUser = async (req, res, next) => {
    try {
        const { userId } = req.body

        if (!userId) throw new Response('Bad Request', 'res_badRequest')

        const result = await updateDeactivationDateToNull({ userId })

        if (!result) throw new Response('Fail to reactivate account', 'res_badRequest')

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            message: 'Reactivate acccount sucessfully',
            status: responseCode.res_ok
        })
    } catch (err) {
        const error = getErrorResponse(err)

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const sendEmailOtp = async (req, res, next) => {
    try {
        const { username } = req.sanitizedBody
        const user = await findUserByUsername(username)

        if (!user) throw new Response('Invalid OTP', 'res_unauthorised')

        const { token, expiredAt } = generateEmailOtp()

        const emailMsg = otp_template(token)

        const { email, userId } = user

        // Check if there is already otp
        await deleteOtpByEmail(email)

        await createNewOTP({ token, expiredAt, userId })

        await sendEmailLink(email, 'Habilidad: One-Time Password', emailMsg)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({ result: { status: responseCode.res_ok, message: 'OTP was sent to your email account', } })
    } catch (err) {
        const error = getErrorResponse(err, 'res_internalServer', 'Failed to send OTP')

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const verifyEmailOtp = async (req, res, next) => {
    try {

        const { username, token } = req.body
        const otp = await findOtpTokenByUsername({ username, token })

        if (otp.length != 1) throw new Response('Internal Server Error', 'res_internalServer')

        // verify if token
        const currentdata = new Date()
        if (otp[0].expiredAt < currentdata) throw new Response('Token Expired', 'res_unauthorised')

        await deleteOtpById(otp[0].oTokenId)

        // Process of generating tokens
        const { userId } = otp[0]
        const { accessToken, refreshToken, jti } = await generateTokenProcedure({ userId })
        // Whitelist refresh token (store in db)
        await deleteRefreshTokenByUserId(userId)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: { status: responseCode.res_ok, data: { accessToken, refreshToken, } },
        })

    } catch (err) {
        const error = getErrorResponse(err, 'res_internalServer', 'Failed to verify')

        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)

    }

}

