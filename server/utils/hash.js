import crypto from 'crypto'
import { Response } from '../responses/response.js'

// hash constant
const idSecrets = {
    course: process.env.COURSE_ID_SECRET,
    topic: process.env.TOPIC_ID_SECRET
}

export const hashToken = (token) => {
    return crypto.createHash('sha512').update(token).digest('hex')
}

export const hashId = (id, type) => {
    const secret = idSecrets[type]

    if (!secret) throw new Response('Internal Server Error', 'res_internalServer')

    return crypto.createHmac('sha512', secret)
        .update(id)
        .digest('hex')
}

export const compareHashedId = (id, type, hashedId) => {
    const secret = idSecrets[type]

    if (!secret) throw new Response('Internal Server Error', 'res_internalServer')

    const newId = crypto.createHmac('sha512', secret)
        .update(id)
        .digest('hex')

    return newId == hashedId
}