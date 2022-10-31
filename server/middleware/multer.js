import multer from 'multer'
import path from 'path'
import { Response } from '../responses/response.js'

const whiteListFileExtension = [
    '.mp4',
    '.jpg',
    '.jpeg',
    '.png'
]

const storage = multer.memoryStorage()

export const imageUpload = multer({
    storage: multer.diskStorage({
        storage
    }),
    fileFilter: (req, file, cb) => {

        let ext = path.extname(file.originalname)
        if (!whiteListFileExtension.includes(ext)) {
            cb(new Response('File type is not supported', 'res_forbidden'), false)
            return
        }
        cb(null, true)
    }
}).single('image')

export const courseUpload = multer({
    storage: multer.diskStorage({
        storage
    }),
    fileFilter: (req, file, cb) => {

        let ext = path.extname(file.originalname)
        if (!whiteListFileExtension.includes(ext)) {
            cb(new Response('File type is not supported', 'res_forbidden'), false)
            return
        }
        cb(null, true)
    }
}).fields([
    { name: 'courseImageFiles', maxCount: 1 },
    { name: 'courseMaterialFiles' }
])