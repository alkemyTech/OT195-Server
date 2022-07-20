const { generateJWT } = require("../helpers/generate-JWT");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { User, Role } = require("../models");
require("dotenv").config();

const getUserDetails = async (req, res) => {
  try {
    const user = req.user;
    const { password, ...userData } = user;

    return res.json({ results: userData, ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error", ok: false });
  }
};

const modifyUser = async (req , res) =>{
  try{
    const {id} = req.params;
    const {firstName , lastName , email} = req.body;
    const idUser = await User.findOne({
      where: {id}
    });
    if(!idUser){
      return res.status(404).json({msg: "Not found", ok: false});
    }
    // console.log(firstName && " hola edgar")
    idUser.firstName = firstName ? firstName : idUser.firstName;
    idUser.lastName = lastName ? lastName : idUser.lastName;
    idUser.email = email ? firstName : idUser.email
    // idUser.set( {firstName, lastName , email} ) // otra forma de hacerlo  con sequelize
    await idUser.save();
    return res.status(200).send({result: idUser , ok:true })
  }catch(error){
    console.log(error);
    return res.status(500).json({msg: "Internal Server Error" , ok: false} );
  }
}

module.exports = {
  logIn: async (req, res) => {
    const { email, password } = req.body;

    const dbUser = await User.findOne({
      where: { email },
      attributes: [
        "id",
        "email",
        "password",
        "roleId",
        "firstName",
        "lastName",
        "deletedAt",
        "image",
      ],
    });

    try {
      if (!dbUser)
        return res.status(404).json({ msg: "Not Found.", ok: false });

      if (dbUser.deletedAt)
        return res.status(404).json({ msg: "Not Found.", ok: false });

      const match = await comparePassword(password, dbUser.password);

      if (!match)
        return res.status(401).json({ msg: "Fail Match.", ok: false });

      const { dataValues } = dbUser;

      const token = await generateJWT(dataValues);

      //   if (dbUser) {
      //     const match = await comparePassword(password, dbUser.password);

      //     if (match) {
      //       const token = await generateJWT(dbUser);
      //       //   console.log(dbUser);
      //       res.status(200).json({
      //         results: { token: token },
      //         ok: true,
      //       });
      //     } else {
      //       throw new Error("fail match");
      //     }
      //   } else {
      //     throw new Error("fail dbUser");
      //   }

      const { deletedAt, password: dbPass, ...data } = dataValues;

      return res.status(200).json({ results: { token, data }, ok: true });
    } catch (error) {
      res.status(401).json({
        msg: error.message,
        ok: false,
      });
    }
  },
  signUp: async (req, res) => {
    let { firstName, lastName, email, password, roleId } = req.body;

    // Existing email checking system
    const usersFound = await User.findAll({
      where: {
        email,
      },
    });

    if (usersFound.length > 0) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // roleId assignment system
    if (roleId) {
      let role = await Role.findOne({
        where: {
          id: roleId,
        },
      });
      if (role) {
        roleId = role.id;
      } else {
        let role = await Role.findOne({
          where: {
            name: "Standard",
          },
        });
        roleId = role.id;
      }
    } else {
      let role = await Role.findOne({
        where: {
          name: "Standard",
        },
      });
      roleId = role.id;
    }

    const encryptedPassword = await encryptPassword(password);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: encryptedPassword,
      roleId,
    });

    const token = await generateJWT(newUser);

    res.status(200).json({
      results: {
        token,
        msg: "User created succesfully",
      },
      ok: true,
    });
  },
  getUserDetails,
  modifyUser,
};
