import { Response } from '../utils/response.js'
import jwt from 'jsonwebtoken'

export const isAuthenticate = async (req, res, next) => {

    try {
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

    return next();
} 