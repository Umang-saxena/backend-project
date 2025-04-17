import multer from 'multer';

// We are diskstorage becauseif someone uploads a file, it will be stored in the disk and then we can access it from there
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./public/temp") // The destination where the file will be stored
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) // The name of the file will be the original name of the file
    }
  })
  
export const upload = multer({ storage: storage })