import { Console } from 'console';
import fs from 'fs'
import { Response } from '../../responses/response.js'

// const output = fs.createWriteStream('./logs/stdout.log');
// const errorOutput = fs.createWriteStream('./logs/stderr.log');

const todayLogFiles = (date) => {
    const allFiles = fs.readdirSync('./logs', function (err, files) {
        if (err) {
            throw new Response('Internal Server Error', 'res_internalServer')
        }
    })
    const logFiles = []

    allFiles.forEach((file) => {
        if (file.includes(date)) logFiles.push(file)
    })

    return logFiles
}

const todayDate = () => {
    let today = new Date()
    return `${today.getFullYear()}${today.getMonth()}${today.getDate()}`
}

export class Logger {
    constructor(date, allFiles, currentFile) {
        this.console = new Console(fs.createWriteStream(currentFile))
        this.date = date
        this.allFiles = allFiles
        this.currentFile = currentFile
    }

    log(logMessage) {
        try {
            // 1GB = 1073741824
            if (this.getFileSize(this.currentFile) + logMessage.msgSize >= 1073741824) {
                this.allFiles = todayLogFiles(this.date)
                this.currentFile = `./logs/${this.date}_${this.allFiles.length}.log`
                this.console = new Console(fs.createWriteStream(this.currentFile))
            }
            this.console.log(logMessage.msg)

        } catch (err) {
            throw new Response('Internal Server Error', 'res_internalServer')
        }
    }

    getFileSize = (filename) => {

        const stats = fs.statSync(filename, (err, stats) => {
            if (err) {
                throw new Response('Internal Server Error', 'res_internalServer')
            }
        })

        return stats.size
    }

    isExceedFileSize = (filename, msgSize) => {
        fs.stat(filename, (err, stats) => {
            if (err) {
                throw new Response('Internal Server Error', 'res_internalServer')
            } else {
                return stats.size + msgSize >= 64
            }
        })
    }

}

const date = todayDate()
const allFiles = todayLogFiles(date)
const currentFile = allFiles.length > 0 ? `./logs/${allFiles[allFiles.length - 1]}` : `./logs/${date}_0.log`
const logger = new Logger(date, allFiles, currentFile);

export default logger