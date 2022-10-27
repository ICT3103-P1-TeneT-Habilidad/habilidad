export const setHeaderTimestamp = (res, req, next) => {
    res.headers['x-timestamp'] = Date.now()

    next()

}