import db from '../utils/db.js'

export const storeNewUser = async (user) => {
    return db.user.create({
        data: {
            username: user.username,
            password: user.hashedPassword,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            deactivationDate: null,
            [user.role.toLowerCase()]: { create: {} },
        },
    })
}

export const findUserByUsername = async (username) => {
    return db.user.findUnique({
        where: {
            username: username,
        },
    })
}

export const findActivatedUserByUsername = async (username) => {
    return db.user.findMany({
        where: {
            username: username,
            deactivationDate: null
        },
    })
}

export const findUserbyUserId = async (userId) => {
    return db.user.findUnique({
        where: {
            userId: userId,
        },
        select: {
            email: true,
            name: true,
            phoneNumber: true,
            role: true,
            username: true
        }
    })
}

export const findUserByEmail = async (email) => {
    return db.user.findMany({
        where: {
            email: email,
        },
    })
}
export const updateDeactivateDate = async (data) => {
    return db.user.update({
        where: {
            userId: data.userId,
        },
        data: {
            deactivationDate: new Date(),
        },
    })
}

export const updatePasswordAndDeleteToken = async (user) => {
    return db.$transaction([
        db.user.update({
            where: {
                userId: user.userId,
                username: user.username,
            },
            data: {
                password: user.hashedPassword,
            },
        }),
        db.emailToken.delete({
            where: {
                userId: user.userId,
            },
        }),
    ])
}

export const findAllUsers = async () => {
    return db.user.findMany({
        select: {
            email: true,
            name: true,
            phoneNumber: true,
            role: true,
            username: true,
            createdOn: true,
            updatedOn: true,
            deactivationDate: true,
            userId: true
        }
    })
}

export const updateUserByUserId = async (data) => {
    return db.user.update({
        where: { userId: data.userId },
        data: {
            name: data.name,
            password: data.password,
            email: data.email,
            phoneNumber: data.phoneNumber,
        },
    })
}

export const updateDeactivationDateToNull = async (data) => {
    return db.user.update({
        where: {
            userId: data.userId
        },
        data: {
            deactivationDate: null
        }
    })
}
