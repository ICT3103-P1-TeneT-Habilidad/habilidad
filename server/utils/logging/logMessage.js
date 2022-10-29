export class LogMessage {
    constructor(statusCode, req) {
        const timestamp = req.headers['x-timestamp']
        this.msg = `${timestamp},${statusCode},${req.method}${req.baseUrl}`
        // this.msg = `${req.headers.x - timestamp},${statusCode},${req.ip},${req.method}/${req.baseUrl}`
        this.msgSize = Buffer.byteLength(this.msg, "utf-8")
    }

}

// log file size limit 1