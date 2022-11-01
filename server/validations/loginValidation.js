import { body, query, check } from 'express-validator'

export const loginFormValidation = [
    // login credentials validation
    body('username').isLength({min: 4, max: 20}),
    body('password').isLength({min: 8, max: 14}),
]
