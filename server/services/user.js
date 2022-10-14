import db from '../utils/db.js'
import { generateSalt, hashText } from '../utils/auth.js'


export const findUserByEmail = async (email) => {
    return db.account.findUnique({
        where: {
            email: email,
        },
    });
}

export const storeNewAccount = async (user) => {
    user.password = hashText(user.password, generateSalt(12));
    return db.account.create({
        data: {
            email: user.email,
            username: 'abs',
            password: user.password,
            phoneNumber: 12345678,
            enabled: true,
            user: {
                create: {
                    name: 'abc',
                    role: 'Student',
                    deActivatedOn: null

                }
            }
        }
    });
}

