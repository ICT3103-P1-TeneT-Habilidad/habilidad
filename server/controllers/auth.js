// import responses
import { Response } from '../responses/response.js'
import jwt from 'jsonwebtoken'
import logger from '../utils/logging/log.js'
import { LogMessage } from '../utils/logging/logMessage.js'

export const isAuthenticate = async (req, res, next) => {
    try {
        const logMsg = new LogMessage(200, req)
        logger.log(logMsg)

        const { authorization } = req.headers

        if (!authorization) {
            throw new Response('Not authorized', 'res_unauthorised')
        }

        const token = authorization.split(' ')[1]
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
        req.payload = payload

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            next(new Response('Token Expired', 'res_unauthorised'))
        }
        next(err)
    }

    return next()
}
