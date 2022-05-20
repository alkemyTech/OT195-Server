const { encryptPassword } = require('../helpers/bcrypt');

module.exports = {
    signUp: (req, res) => {
        res.send('valid');
    }
}