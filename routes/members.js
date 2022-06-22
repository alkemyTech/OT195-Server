var express = require("express");
var router = express.Router();

const { adminValidate } = require("../middlewares/adminValidate");
const { validateJWT } = require("../middlewares/validate-JWT");

const {
  createMember,
  listMembers,
  updateMember,
  deleteMember,
} = require("../controllers/members");

/* GET members. */
router.get("/", listMembers);

// Create members
router.post("/", validateJWT, adminValidate, createMember);
const { Member } = require("../models");

// Update members
router.put("/:id", validateJWT, adminValidate, updateMember);

// Delete member
router.delete("/:id", validateJWT, adminValidate, deleteMember);

module.exports = router;
module.exports = router;
/* GET members. */
router.get("/", async (req, res, next) => {
  try {
    const dbMembers = await Member.findAll();
    res.status(200).json({
      results: dbMembers,
      ok: true,
    });
  } catch (error) {
    res.status(400).json({
      msg: error.message,
      ok: false,
    });
  }
});

module.exports = router;
