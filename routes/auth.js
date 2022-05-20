const router = require('express').Router();

const { signUp } = require('../controllers/auth');
const { registerValidator } = require('../middlewares/userValidate')

router.post('/register', registerValidator, signUp)



module.exports = router;