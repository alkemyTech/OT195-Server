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
                            results:{token: token},
                            ok: true
                        });
                }else{
                    throw new Error("fail match")
                }
                
            }else{
                throw new Error("fail dbUser")
            }

        } catch (error) {
            res.status(401).json(
                {
                    msg:error.message,
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

        /* 
        Error when I try generate JWT with newUser
        const token = await generateJWT(newUser); */

        res.status(200).json({
            msg: "User created succesfully",
            ok: true 
        })
    }
}