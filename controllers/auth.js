const { generateJWT } = require('../helpers/generate-JWT');
const {comparePassword, encryptPassword} = require('../helpers/bcrypt');
const { User, Role } = require('../models');
require('dotenv').config();


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
                    res.status(200).json(
                        {
                        token:token,
                        ok: true
                        });
                }else{
                    throw new Error()
                }
                
            }else{
                throw new Error()
            }

        } catch (error) {
            res.status(401).json(
                {
                    message:"Invalid email or password. Please, try again.",
                    ok: false
                }
                )
        }
    },
    signUp: async(req, res) => {

        let {firstName, lastName, email, password, roleId} = req.body;

        // Existing email checking system
        const usersFound = await User.findAll({
            where: {
                email
            }
        });

        if(usersFound.length > 0) {
            return res.status(400).json({msg: 'Email already exists'});
        }
        
        // roleId assignment system
        if(roleId) {
            let role = await Role.findOne({
                where: {
                    id: roleId
                }
            });
            if(role) {
                roleId = role.id;
            } else {
                let role = await Role.findOne({
                    where: {
                        name: 'Standard'
                    }
                })
                roleId = role.id;
            }
        } else {
            let role = await Role.findOne({
                where: {
                    name: 'Standard'
                }
            })
            roleId = role.id;
        }

        const encryptedPassword = await encryptPassword(password);

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password: encryptedPassword,
            roleId
        })

        await generateJWT({newUser});

        res.json({
            newUser
        })
    }
}