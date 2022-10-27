import db from '../utils/db.js'
import { findUserbyUserId } from './user.js'

export const updatePasswordAndDeleteToken = async (user) => {
    return db.$transaction([
        db.account.update({
            where: {
                accountId: user.accountId,
                username: user.username
            },
            data: {
                password: user.hashedPassword,
            },
        }),
        db.emailToken.delete({
            where: {
                userId: user.userId,
            },
        })

    ])
}

export const updatePasswordByUserId = async (user) => {
    const accountId = findUserbyUserId(user.userId).accountId
    return db.account.update({
        where: {
            accountId: accountId,
            username: 'test2'
        },
        data: {
            password: user.password,
        },
    })
}

export const findAccountByUsername = async (username) => {
    return db.account.findUnique({
        where: {
            username: username,
        },
        include: {
            user: true
        }
    });
}

export const storeNewAccount = async (user) => {
    return db.account.create({
        data: {
            username: user.username,
            password: user.hashedPassword,
            enabled: true,
            user: {
                create: {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    role: user.role,
                    deActivatedOn: null,
                    [user.role.toLowerCase()]: {
                        create: {

                        }
                    }
                }
            }
        },
        include: {
            user: true
        }
    });
}