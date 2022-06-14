var express = require('express');
var router = express.Router();

const {
    adminValidate
} = require('../middlewares/adminValidate');
const {
    validateJWT
} = require('../middlewares/validate-JWT');

const {
    createMember,
    listMembers,
    updateMember,
    deleteMember
} = require('../controllers/members');


/* GET members. */
router.get('/', validateJWT, adminValidate, listMembers);

// Create Members
router.post("/", validateJWT, adminValidate, createMember);

module.exports = router;