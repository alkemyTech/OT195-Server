const bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: async(password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS))
        return await bcrypt.hash(password, salt)
    }
}