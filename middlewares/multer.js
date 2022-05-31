const multer = require('multer');
const path = require('path');

const { randomHash } = require('../helpers/randomHash');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images'))
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        cb(null, randomHash() + ext)
    }
});

// To upload an image, use upload.single('image-field-name')
// To save in database use req.file.filename property for image field

const upload = multer({storage});

module.exports = { upload };