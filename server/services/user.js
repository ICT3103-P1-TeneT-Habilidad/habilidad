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
            [user.role.toLowerCase()]: { create: {} }
        }
    });
}

export const findUserByUsername = async (username) => {
    return db.user.findUnique({
        where: {
            username: username,
        }
    })
}

export const findUserbyUserId = async (userId) => {
    return db.user.findUnique({
        where: {
            userId: userId,
        },
    })
}

export const findInstructorIdByUserId = async (userId) => {
    return db.instructor.findUnique({
        where: {
            userId: userId,
        },
    })
}

export const findStudentIdByUserId = async (userId) => {
    return db.student.findUnique({
        where: {
            userId: userId
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

export const updatePasswordAndDeleteToken = async (user) => {
    return db.$transaction([
        db.user.update({
            where: {
                userId: user.userId,
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