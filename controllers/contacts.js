const { Contact } = require("../models");

const createContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    return res.status(201).json({ msg: "Contact created succesfully", ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};

const listContacts = async(req, res) => {
  try {
      const results = await Contact.findAll({
          where: {
              deletedAt: null
          }
      });
      res.json({
          results,
          ok: true
      })
  } catch (error) {
      res.json({
          msg: error.message,
          ok: false
      })
  }
}


module.exports = {
    createContact,
    listContacts
};
