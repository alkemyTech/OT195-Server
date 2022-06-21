const {Router} = require("express");

const {createTestimony, modifyTestimony, allTestimonies , deletedTestimony, detailTestimony } = require("../controllers/tetimonies");
const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');
const { upload } = require("../middlewares/multer");

const router = Router();

router.post("/testimonials",validateJWT , adminValidate  , createTestimony ); 

router.put("/testimonials/:id", validateJWT, adminValidate, modifyTestimony); 

//
router.get("/", allTestimonies);

//borrar testimonio por su id
router.delete("/:id", validateJWT, adminValidate, deletedTestimony)

//detail the testimony
router.get("/:id", detailTestimony)


module.exports = router;



