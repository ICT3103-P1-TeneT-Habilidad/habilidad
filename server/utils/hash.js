import crypto from 'crypto'
import { Response } from '../responses/response.js'

export const hashToken = (token) => {
    return crypto.createHash('sha512').update(token).digest('hex')
}