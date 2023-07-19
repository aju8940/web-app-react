const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: '../Uploads',
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        let ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            cb(new Error('File type is not supported.'), false);
            return;
        }
        cb(null, true);
    }
});

module.exports = upload.single('image');