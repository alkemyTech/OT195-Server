const router = require('express').Router();
const { validateJWT } = require('../middlewares/validate-JWT');
const { adminValidate } = require('../middlewares/adminValidate');

const { contact } = require('../models');

router.get('/', validateJWT, adminValidate, async(req, res) => {
    try {
        const results = await contact.findAll({
            where: {
                deletedAt: null
            }
        });
        res.json({
            results,
            ok: true
        })
    } catch (error) {
        res.json({
            msg: error.message,
            ok: false
        })
    }
})


module.exports = router;