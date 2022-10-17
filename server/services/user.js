import db from '../utils/db.js'

export const findAccountByEmail = async (email) => {
    return db.account.findUnique({
        where: {
            email: email,
        },
    });
}

export const storeNewAccount = async (user) => {
    return db.account.create({
        data: {
            email: user.email,
            username: user.username,
            password: user.hashedPassword,
            phoneNumber: user.phoneNumber,
            enabled: true,
            user: {
                create: {
                    name: user.name,
                    role: user.role,
                    deActivatedOn: null

                }
            }
        },
        include: {
            user: true
        }
    });
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

export const findUserbyUserId = async (userId) => {
    return db.user.findUnique({
        where: {
            userId: userId
        }
    })
}