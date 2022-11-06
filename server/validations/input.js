import axios from 'axios'
import { createHash } from 'crypto'
import { body } from 'express-validator'
import fs from 'fs/promises'

// Check if password matches email, useername or name
const isContext = (body) => {
    if (body.email.split('@')[0] === body.password || body.password === body.username || body.password === body.name) {
        return true
    }

    return false
}

// Check if any 3 characters are sequential or repetitive
const isSequentialOrRepetitive = (str, n) => {
    const num = '0123456789'
    const abc = 'abcdefghijklmnopqrstuvqxyz'

    for (var i = 0; i < str.length; i++) {
        if (i + n > str.length) break

        var chunk = str.slice(i, i + n)
        var seqABC = abc.indexOf(chunk) > -1
        var seq123 = num.indexOf(chunk) > -1

        if (seq123 || seqABC) {
            return true
        }

        if ([...chunk].every((v) => v === chunk[0])) {
            return true
        }
    }

    return false
}

// Password requirement
export const validatePasswords = async (req) => {
    const { password, username, email, name } = req.body

    // Check password length
    if (password.length < 8 || password.length > 15) {
        return Promise.reject('Password does not meet complexity requirements or is a pwned password')
    }

    // Check against passowrds obtained from previous breach corpuses
    const hash = createHash('sha1')
    hash.update(password)
    const hashedPassword = hash.digest('hex')
    const breach = await axios.get(`https://api.pwnedpasswords.com/range/${hashedPassword.slice(0, 5)}`)
    const data = breach.data.split(/[\r\n:]/)
    if (data.includes(hashedPassword.slice(5, hashedPassword.length))) {
        return Promise.reject('Password does not meet complexity requirements or is a pwned password')
    }

    // Check against dictionary words
    const words = (await fs.readFile('./assets/words.txt', { encoding: 'utf8' })).split(/\n/)
    if (words.includes(password)) {
        return Promise.reject('Password does not meet complexity requirements or is a pwned password')
    }

    // Check for repetitive or sequential characters
    if (isSequentialOrRepetitive(password, 3)) {
        return Promise.reject('Password does not meet complexity requirements or is a pwned password')
    }

    // Check for context-specific words
    if (isContext({ password, username, email, name })) {
        return Promise.reject('Password does not meet complexity requirements or is a pwned password')
    }

    return Promise.resolve(true)
}

// Email requirement
export const validateEmail = (req) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    if (reg.test(req.body.password)) {
        return Promise.reject('Entered value does not match email format')
    }

    return Promise.resolve(true)
}

// Username requirement
export const validateUsername = (req) => {
    const { username } = req.body
    if (username < 4 || username > 20) {
        return Promise.reject('username does not meet length requirement')
    }
    return Promise.resolve(true)
}

// Name requirement
export const validateName = (req) => {
    const { name } = req.body
    if (name < 4 || name > 14) {
        return Promise.reject('name does not meet length requirement')
    }
    return Promise.resolve(true)
}

// Phone number requirement
export const validatePhoneNum = (req) => {
    const { phoneNumber } = req.body
    if (phoneNumber < 80000000 || phoneNumber > 99999999) {
        return Promise.reject('Phone number is not Singapore number ')
    }
    return Promise.resolve(true)
}

// Prevent Code Injection, XSS
export const sanitizeBody = async (req, res, next) => {

    try {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            '/': '&#x2F;',
            '`': '&#x60;',
            '=': '&#x3D;',
        }
        const reg = /[&<>"'`=\/]/g

        const sanitizedBody = {}

        for (let x in req.body) {
            sanitizedBody[x] = req.body[x].replace(reg, (match) => map[match])
        }

        req.sanitizedBody = sanitizedBody

        next()
    } catch (err) {
        const error = getErrorResponse(err)
        next(error)
    }
}

export const sanitizeUrlParam = async (req, res, next) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;',
    }
    const reg = /[&<>"'`=\/]/g

    const sanitizedParams = {}

    for (let x in req.params) {
        sanitizedParams[x] = req.params[x].replace(reg, (match) => map[match])
    }

    req.sanitizedParams = sanitizedParams

    next()
}

export const replaceSanitizedQuot = (string) => {
    const map = {

        '&quot;': '"',
        '&#39;': "'",
    }
    const reg = /&quot;|&#39;/g

    const newString = string.replace(reg, (match) => map[match])

    return newString

}