const fs = require('fs')
const multer = require('multer')
// const uuid = require('uuid');


const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    if (!fs.existsSync('uploads')) {
      fs.mkdirSync('uploads');
    }
    cb(null, 'uploads');
  },
    filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});


const upload = multer({ storage });

module.exports = { upload }