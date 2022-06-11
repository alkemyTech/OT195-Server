const router = require("express").Router();

const { adminValidate } = require("../middlewares/adminValidate");
const { validateJWT } = require("../middlewares/validate-JWT");

const { updateCategory } = require("../controllers/categories");

router.put("/:id", validateJWT, adminValidate, updateCategory);

module.exports = router;
