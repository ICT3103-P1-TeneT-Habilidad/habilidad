import db from '../utils/db.js'

export const updatePassword = async (user,hashedPassword) => {
    return db.account.update({
        where: {
            username: user.username,
        },
        data: {
            password: hashedPassword,
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