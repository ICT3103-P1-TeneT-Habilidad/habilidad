// import responses
import { Response } from '../responses/response.js'
import jwt from 'jsonwebtoken'
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'
import { getErrorResponse } from '../utils/error.js'
import { responseCode } from '../responses/responseCode.js'
import { findRefreshTokenByUserId, revokeTokensByUserId, addRefreshTokenToWhitelist, revokeLastTokenById } from '../services/refreshTokens.js'
import { generateTokenProcedure } from '../utils/auth.js'
import { hashToken } from '../utils/hash.js'

export const isAuthenticate = async (req, res, next) => {
    try {

        const { authorization } = req.headers

        if (!authorization) {
            throw new Response('Not authorized', 'res_unauthorised')
        }

        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.payload = payload

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        next()

    } catch (err) {
        let error
        if (err.name === 'TokenExpiredError') {
            error = new Response('Token Expired', 'res_unauthorised')
        }
        else {
            error = getErrorResponse(err)
        }
        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const refreshAccessToken = async (req, res, next) => {
    try {

        const { userId } = req.payload

        // Generate tokens
        const { accessToken, refreshToken, jti } = await generateTokenProcedure({ userId })
        // Whitelist refresh token (store in db)
        await addRefreshTokenToWhitelist({ jti, refreshToken, userId })

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        res.status(responseCode.res_ok).json({
            result: {
                status: responseCode.res_ok,
                data: {
                    accessToken,
                    refreshToken,
                }
            },
        })
    } catch (err) {
        let error
        if (err.name === 'TokenExpiredError') {
            error = new Response('Access Token Expired', 'res_unauthorised')
        }
        else {
            error = getErrorResponse(err)
        }
        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }
}

export const isRefreshTokenValid = async (req, res, next) => {
    try {

        const { refreshToken } = req.body

        // Check if expired
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET)

        // Check if refresh token is compromised
        const { userId } = payload

        const tokens = await findRefreshTokenByUserId(userId)
        const hashedToken = hashToken(refreshToken)
        if (tokens.length > 200) throw new Response('Re-login', 'res_unauthorised')
        else if (tokens[0].token !== hashedToken && tokens[0].token) {
            await revokeTokensByUserId(userId)
            throw new Response('Unauthorised', 'res_unauthorised')
        }

        req.payload = payload

        // Revoke used token
        await revokeLastTokenById(tokens[0].rTokenId)

        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        next()

    } catch (err) {
        let error
        if (err.name === 'TokenExpiredError') {
            error = new Response('Refresh Token Expired', 'res_unauthorised')
        }
        else {
            error = getErrorResponse(err)
        }
        const logMsg = new LogMessage(error.statusCode, req)
        logger.log(logMsg)

        next(error)
    }

}
