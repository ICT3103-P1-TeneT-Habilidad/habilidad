import multer from 'multer'
import path from 'path'

const whiteListFileExtension = [
    '.mp4',
    '.jpg',
    '.jpeg',
    '.png'
]

multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    }),
    fileFilter: (req, file, cb) => {

        let ext = path.extname(file.originalname)
        if (whiteListFileExtension.includes(ext)) {
            cb(new Response('File type is not supported', 'res_forbidden'), false)
            return
        }
        cb(null, true)
    }
})

export default multer