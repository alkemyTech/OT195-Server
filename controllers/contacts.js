const { Contac , Contact } = require("../models");
const { sendContactEmail } = require("../helpers/send-emails");

const createContact = async (req, res) => {
  try {
    const {name , email , message , phone} = req.body
    // const creando =  await Contact.create({name, email, message , phone}); // esto lo comento para que funcione , tira un error como que no existe la tabla;
    await sendContactEmail(req.body.email);

    return res
      .status(201)
      .json({ msg: "¡Email send!", ok: true });
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
    console.log(error)
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
