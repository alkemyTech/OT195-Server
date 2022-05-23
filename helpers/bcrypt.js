const bcrypt = require('bcryptjs');

module.exports = {
    comparePassword: async(reqPass, dbPass)=>{
        return await bcrypt.compare(reqPass, dbPass, (err,res)=>{
            if(err){
                return({
                    ok: false
                })
            }
        })
    },
    encryptPassword: async(password) => {
        const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_ROUNDS))
        return await bcrypt.hash(password, salt)
    }
}