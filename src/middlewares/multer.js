import multer from 'multer'
import { paths } from '../config/images-paths'

const storage = multer.diskStorage({
  destination: (req, { fieldname }, callback) => {
    if (!paths[fieldname]) {
      throw new Error(`Invalid fieldname: ${fieldname} for multer`)
    }
  
    callback(null, paths[fieldname])
  },
  filename: (req, { originalname }, callback) => callback(null, originalname),
})

const upload = multer({ storage })

export const uploadImages = (name) => upload.array(name)