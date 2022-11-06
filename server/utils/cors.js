var allowlist = ['http://172.16.1.2:3000', 'http://128.199.202.23:2096']
export const corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    if (allowlist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
}