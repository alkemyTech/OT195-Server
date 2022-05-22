const { generateJWT } = require('../helpers/generate-JWT');
const {comparePassword} = require('../helpers/bcrypt');
const { User } = require('../models');

module.exports = {
    logIn: async(req, res)=> {
        const {email, password} = req.body;
    
        const dbUser = await User.findOne({
            where:{email: email}
        })
    
        try {
            if(dbUser){
                const match =  await comparePassword(password, dbUser.password)
                
                if(match){
                    const token = await generateJWT(dbUser);
                    res.status(200).json(token);
                }else{
                    throw new Error()
                }
                
            }else{
                throw new Error()
            }

        } catch (error) {
            res.status(401).json("Invalid email or password. Please, try again.")
        }
        
    }
}