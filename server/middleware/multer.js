import multer from 'multer'
import path from 'path'
import { Response } from '../responses/response.js'

const whiteListFileExtension = ['.mp4', '.jpg', '.jpeg', '.png']
const blackListFileName = [
    "CON", "PRN", "AUX",
    "NUL", "COM1", "COM2",
    "COM3", "COM4", "COM5",
    "COM6", "COM7", "COM8",
    "COM9", "LPT1", "LPT2",
    "LPT3", "LPT4", "LPT5",
    "LPT6", "LPT7", "LPT8",
    "LPT9"
]
const storage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    let ext = path.extname(file.originalname)
    if (!whiteListFileExtension.includes(ext)) {
        return cb(new Response('File type is not supported', 'res_forbidden'), false)
    }
    if (blackListFileName.includes(path.basename(file.originalname, ext))) {
        return cb(new Response('File name is not supported', 'res_forbidden'), false)
    }
    cb(null, true)
}

export const imageUpload = multer({
    storage: multer.diskStorage({
        storage,
    }),
    fileFilter: fileFilter,
}).single('image')

export const courseUpload = multer({
    storage: multer.diskStorage({
        storage,
    }),
    fileFilter: fileFilter,
}).fields([{ name: 'image', maxCount: 1 }, { name: 'materialFiles' }])
