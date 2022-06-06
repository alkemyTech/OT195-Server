const {Router} = require("express");

const {createTestimony} = require("../controllers/tetimonies");
const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');
const { upload } = require("../middlewares/multer");

const router = Router();

router.post("/testimonials", upload.single("image") , validateJWT , adminValidate  ,createTestimony );

module.exports = router;



