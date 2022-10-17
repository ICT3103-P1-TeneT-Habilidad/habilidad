import db from '../utils/db.js'

export const findUserByEmail = async (email) => {
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

export const findUserByUsername = async (username) => {
    return db.account.findUnique({
        where: {
            username: username,
        },
        include: {
            user: true
        }
    });
}
