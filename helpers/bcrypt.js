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
    }
}