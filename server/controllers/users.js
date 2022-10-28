import crypto from 'crypto'
import { Response } from '../utils/response.js'
// import utils
import { decodeToken, generateTokens } from '../utils/jwt.js'
import { responseCode } from '../utils/responseCode.js'
import { sendEmailLink, generateEmailToken, decodeEmailToken } from '../utils/email.js'
import { generateSalt, hashText, verifyPassword } from '../utils/auth.js'
// import services
import { addRefreshTokenToWhitelist } from '../services/auth.js'
import { findUserbyUserId, findUserByEmail, deActivateUser } from '../services/user.js'
import { updatePassword, findAccountByUsername, storeNewAccount } from '../services/account.js'
import { findEmailToken, replaceEmailToken, saveEmailToken } from '../services/token.js'
// import constants
import { email_template, email_template_deactivate } from '../constants.js'

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
export const userDeactivate = async (req, res, next) => {

    try {

        const { userId } = req.payload

        const result = await deActivateUser(userId)

        next()

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

export const resetPassword = async (req, res, next) => {
    try {
        const token = decodeEmailToken(req.params.token);

        console.log(token);
        // const userId = token.userId;

        // const userId = req.body.username
        // const user = await findAccountByUsername(username)

        // if (!user) return res.status(responseCode.res_badRequest).send('User does not exist')

        // const token = await findEmailToken({
        //     userid: user.userId,
        //     token: req.params.token,
        // })

        // if (!token) return res.status(responseCode.res_ok).send('Invalid link')

        // user.password = req.body.password

        // await updatePassword(user)
        // await token.delete()

        res.status(responseCode.res_ok).json({
            status: 'Password reset sucessfully',
        })
    } catch (err) {
        res.status(responseCode.res_internalServer).json({
            status: 'Failed to reset password',
            message: err.message,
        })
    }
}

export const sendEmailResetLink = async (req, res) => {
    try {
        const email = req.body.user_email

        const user = await findUserByEmail(email)

        if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

        if (!user) return res.status(responseCode.res_badRequest).send("User with given email doesn't exist")

        let token = await findEmailToken(user[0].userId)

        const currentDate = new Date(Date.now())
        const expiredDate = new Date(currentDate + 1 * (60 * 60 * 1000))

        if (!token) {
            token = generateEmailToken({ userId: user[0].userId, expiredAt: expiredDate, createdAt: currentDate })
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
            throw new Error('Invalid Link')
        }

        const emailMsg = email_template(token)

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
// export const sendEmailDeactivateAcc = async (req, res) => {
//     try {
//         const email = req.body.user_email

//         const user = await findUserByEmail(email)

//         if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

//         if (!user) return res.status(responseCode.res_badRequest).send("User with given email doesn't exist")

//         // let token = await findEmailToken(user[0].userId)

//         // const currentDate = new Date(Date.now())
//         // const expiredDate = new Date(currentDate + 1 * (60 * 60 * 1000))

//         // if (!token) {
//         //     token = generateEmailToken({ userId: user[0].userId, expiredAt: expiredDate, createdAt: currentDate })
//         //     const result = await saveEmailToken({
//         //         userId: user[0].userId,
//         //         token: token,
//         //         expiredAt: expiredDate,
//         //     })
//         // }

//         // if (token.expiredAt > token.createdAt) {
//         //     token = generateEmailToken(user[0].userId)
//         //     const result = await replaceEmailToken({
//         //         userId: user[0].userId,
//         //         token: token,
//         //         expiredAt: expiredDate,
//         //         updatedAt: currentDate,
//         //     })
//         // } else if (token.expiredAt < token.createdAt) {
//         //     throw new Error('Invalid Link')
//         // }

//         const emailMsg = "Your account has been deactivated as of " + new Date() + email

//         await sendEmailLink(email, 'Account Deactivate', emailMsg)

//         res.status(responseCode.res_ok).json({
//             status: 'Deactivate conformation email has been sent',
//             message: "Email is" + email + emailMsg,
//         })
//     } catch (err) {
//         res.status(responseCode.res_internalServer).json({
//             status: 'Failed to send deactivation conformation email',
//             message: err.message,
//         })
//     }
// }
export const sendEmailDeactivateAcc = async (req, res) => {
    try {
        const email = req.body.user_email

        const user = await findUserByEmail(email)

        if (user.length != 1) throw new Response('Internal Error', 'res_internalServer')

        // let token = await findEmailToken(user[0].userId)

        // let expiredAt
        // let issueAt

        // // No valid email token in db
        // if (!token) {
        //     token = generateEmailToken({ userId: user[0].userId })
        //     const tokenPayload = decodeEmailToken(token)
        //     expiredAt = new Date(tokenPayload.exp * 1000)
        //     await saveEmailToken({
        //         userId: user[0].userId,
        //         token: token,
        //         expiredAt: expiredAt,
        //     })
        // }
        // // Has valid email token in db
        // else {
        //     token = generateEmailToken({ userId: user[0].userId })
        //     const tokenPayload = decodeEmailToken(token)
        //     expiredAt = new Date(tokenPayload.exp * 1000)
        //     issueAt = new Date(tokenPayload.iat * 1000)
        //     await replaceEmailToken({
        //         userId: user[0].userId,
        //         token: token,
        //         expiredAt: expiredAt,
        //         updatedAt: issueAt,
        //     })
        // }

        //const emailMsg = email_template(token.token)
        const emailMsg = email_template_deactivate


        await sendEmailLink(email, 'Deactivate Account', emailMsg)

        res.status(responseCode.res_ok).json({
            status: 'Account has been deactivated',
        })
    } catch (err) {
        next(err)
    }
}