const { Contact } = require("../models");
const {sendContactEmail} = require("../helpers/send-emails");

const createContact = async (req, res) => {
  try {
    await Contact.create(req.body);
    await sendContactEmail(req.body.email)

    return res.status(201).json({ msg: "¡Gracias por haberte contactado con nosotros!", ok: true });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: "Internal Server Error.", ok: false });
  }
};


module.exports = {
    createContact,
};
