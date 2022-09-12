import { Response } from '../utils/response.js'

export const getUsers = async (req, res, next) => {
    const err = new Response('not implemented', 'res_notImplemented')
    next(err)
}
