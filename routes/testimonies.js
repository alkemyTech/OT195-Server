const {Router} = require("express");

const {createTestimony, modifyTestimony, allTestimonies , deletedTestimony, detailTestimonies } = require("../controllers/tetimonies");
const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');
const { upload } = require("../middlewares/multer");

const router = Router();

router.post("/",validateJWT , adminValidate  , createTestimony ); 

router.put("/:id", validateJWT, adminValidate, modifyTestimony); 

router.get("/", allTestimonies);

router.delete("/:id", validateJWT, adminValidate, deletedTestimony)

//router.get("/:id",detailTestimonies)


module.exports = router;



