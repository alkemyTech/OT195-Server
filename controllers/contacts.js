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


module.exports = {
    createContact,
};
