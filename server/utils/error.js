import { Prisma } from '@prisma/client'
import { Response } from '../responses/response.js'

export const getErrorResponse = (err, status, message) => {
    if (err instanceof Response) return err
    let error
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        error = new Response('Internal Server Error', 'res_internalServer')
    } else {
        error = new Response(message || 'Internal Server Error', status || 'res_internalServer')
    }
    return error
}