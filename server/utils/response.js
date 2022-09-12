import { responseCode } from "./responseCode.js"

export class Response extends Error {
    constructor(message, resCode) {
        super(message)
        this.statusCode = responseCode[resCode]
    }
}