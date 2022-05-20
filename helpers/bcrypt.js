const bcrypt = require('bcryptjs');

module.exports = {
    encryptPassword: async(password) => {
        const salt = await bcrypt.genSalt(process.env.BCRYPT_ROUNDS)
        return await bcryps.hash(password, salt)
    }
}