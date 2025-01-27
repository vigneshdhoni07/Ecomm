import path from "path"
import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.resolve("src","files"))
    },
    filename: function (req, file, cb) {
      const uniquePreffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePreffix+'-'+file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

  export default upload