import requestIp from 'request-ip'

export class LogMessage {
    constructor(statusCode, req) {
        const timestamp = req.headers['x-timestamp']
        this.msg = `${timestamp},${statusCode},${requestIp.getClientIp(req)},${req.method}${req.baseUrl}`
        this.msgSize = Buffer.byteLength(this.msg, "utf-8")
    }

}

// log file size limit 1