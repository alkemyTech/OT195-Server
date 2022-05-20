var express = require('express');
var router = express.Router()

const { signUp } = require('../controllers/auth');
const { registerValidator, checkValidator } = require('../middlewares/userValidate')

router.get('/', (req, res) => {
    res.send('hi')
})

router.post('/register', registerValidator, checkValidator, signUp)


module.exports = router;