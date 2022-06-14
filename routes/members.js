var express = require('express');
var router = express.Router();
const {
    Member
} = require('../models');

/* GET members. */
router.get('/', async (req, res, next) => {
    try {
        const dbMembers = await Member.findAll()
        res.status(200).json({
            results: dbMembers,
            ok: true
        });
    } catch (error) {
        res.status(400).json({
            msg: error.message,
            ok: false
        });
    }
});

module.exports = router;