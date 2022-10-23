export const validatePasswords = (req) => {

    const { password } = req.body

    let result = true

    if (password.length < 8 || password.length > 15) {
        result = false
    }

    return new Promise.resolve(result)
}

export const validateEmail = (req) => {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    let result = false

    if (reg.test(req.body.password)) {
        result = true
    }

    return new Promise.resolve(result)
}

// Prevent Code Injection, XSS
export const sanitizeBody = async (req, res, next) => {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
        '/': '&#x2F;',
        '`': '&#x60;',
        '=': '&#x3D;'
    };
    const reg = /[&<>"'`=\/]/g

    const sanitizedBody = {}

    for (let x in req.body) {
        sanitizedBody[x] = req.body[x].replace(reg, (match) => (map[match]))
    }

    req.sanitizedBody = sanitizedBody

    next()
}