const { generateJWT } = require("../helpers/generate-JWT");
const { comparePassword, encryptPassword } = require("../helpers/bcrypt");
const { User, Role } = require("../models");
require("dotenv").config();

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
};
