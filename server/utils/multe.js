const fs = require('fs')
const multer = require('multer')
const uuid = require('uuid');


const storage = multer.diskStorage({
    destination: (_, __, cb) => {
      if (!fs.existsSync('uploads')) {
        fs.mkdirSync('uploads');
      }
      cb(null, 'uploads');
    },
    filename: (_, file, cb) => {
      const imgName = uuid.v4() + file.originalname
      cb(null, imgName);
    },
  });
  
  const upload = multer({ storage });

  module.exports = {upload}