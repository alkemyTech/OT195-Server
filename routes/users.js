const { Router } = require("express");
const { User } = require("../models");
const { validateJWT } = require("../middlewares/validate-JWT");
const { adminValidate } = require("../middlewares/adminValidate");
const { check } = require("express-validator");
const { checkValidator } = require("../middlewares/userValidate");
const {modifyUser , detailUser} = require("../controllers/auth")

const router = Router();

/* GET users listing. */
router.get("/",
 validateJWT, 
 adminValidate, 
 async (req, res) => {
  try {
    const dbUsers = await User.findAll();
    res.status(200).json({
      results: dbUsers,
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      ok: false,
    });
  }
});

// DELETE user
router.delete(
  "/:id",
  validateJWT,
  // adminValidate,
  [
    check("id", `The user 'id' needs to be an integer.`).isInt(),
    checkValidator,
  ],
  async (req, res) => {
    let paramURL = req.params.id;
    try {
      const user = await User.findOne({
        where: {
          id: paramURL,
        },
      });
      if (user != null) {
        await user.destroy();
        res.status(200).json({
          msg: "User succesfully deleted",
          ok: true,
        });
      }
    } catch (error) {
      res.status(400).json({
        msg: error.message,
        ok: false,
      });
    }
  }
);

router.put("/:id" , validateJWT, modifyUser); // modfico los datos del usuario

router.get(
  "/:id",
  // [ validateJWT,],
  detailUser
);

module.exports = router;
