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
router.get("/", validateJWT, adminValidate, listMembers);

// Create Members
router.post("/", validateJWT, adminValidate, createMember);
const { Member } = require("../models");

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
