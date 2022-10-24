export const updatePassword = async (user) => {
    return db.account.update({
        where: {
            username: user.username,
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
            email: user.email,
            username: user.username,
            password: user.hashedPassword,
            phoneNumber: user.phoneNumber,
            enabled: true,
            user: {
                create: {
                    name: user.name,
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

export const findAccountByEmail = async (email) => {
    return db.account.findUnique({
        where: {
            email: email,
        },
    });
}