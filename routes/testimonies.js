const {Router} = require("express");

const {createTestimony, modifyTestimony, allTestimonies , deletedTestimony} = require("../controllers/tetimonies");
const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');
const { upload } = require("../middlewares/multer");

const router = Router();

router.post("/testimonials",validateJWT , adminValidate  , createTestimony ); // para el post de imagen utilo la ruta de uploads.js

router.put("/testimonials/:id", validateJWT, adminValidate, modifyTestimony); // para el put de imagen utilo la ruta de uploads.js

router.get("/", allTestimonies);

router.delete("/:id", validateJWT, adminValidate, deletedTestimony)


module.exports = router;



