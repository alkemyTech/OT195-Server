const { Contact } = require("../models");
const { sendContactEmail } = require("../helpers/send-emails");

const createContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    await sendContactEmail(req.body.email);

    return res
      .status(201)
      .json({ msg: "¡Gracias por haberte contactado con nosotros!", ok: true });
  } catch (err) {
    return res.status(500).json({ msg: err, ok: false });
  }
};

const listContacts = async (req, res) => {
  try {
    const results = await Contact.findAll({
      where: {
        deletedAt: null,
      },
    });
    res.json({
      results,
      ok: true,
    });
  } catch (error) {
    res.json({
      msg: error.message,
      ok: false,
    });
  }
};

module.exports = {
  createContact,
  listContacts,
};
