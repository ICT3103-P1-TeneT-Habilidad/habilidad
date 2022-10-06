import { Response } from '../utils/response.js'
// import { PrismaClient } from '@prisma/client'

// const prisma = new PrismaClient()

export const getUsers = async (req, res, next) => {
    const err = new Response('not implemented', 'res_notImplemented')
    next(err)
}

// export const getUser = async (req, res, next) => {
//     const users = await prisma.user.findMany();
//     if(users){
//         res.status(res_ok).json(users)
//     }
// }
