const { Contac , Contact } = require("../models");
const { sendContactEmail , sendPortfolioEmail } = require("../helpers/send-emails");

const createContact = async (req, res) => {
  try {
    const {name , email , message , phone} = req.body
    // const creando =  await Contact.create({name, email, message , phone}); // esto lo comento para que funcione , tira un error como que no existe la tabla;
    await sendContactEmail(email , name);

    return res
      .status(201)
      .json({ msg: "¡Email send!", ok: true });
  } catch (err) {
    return res.status(500).json({ msg: err, ok: false });
  }
};

//funcion que es para mi portfolio de angular , para la parte de contactarse y que envie un email
const portfolioContact = async(req, res) =>{
  try{
    const {name , email, message , phone } = req.body;
    if(!name){
      return res.status(400).json({msg:"name  is required" , ok:false });
    }
    if(!email){
      return res.status(400).json({msg:"email  is required" , ok:false });
    }
    if(!message){
      return res.status(400).json({msg:"message  is required" , ok:false });
    }
    if(!phone){
      return res.status(400).json({msg:"phone  is required" , ok:false });
    }
    await sendPortfolioEmail(email, name);
    return res.status(201).json({ msg: "¡Email send!", ok: true });
  }catch(err){
    return res.status(500).json({msg:err , ok:false } )
  }
}

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
  portfolioContact,
  listContacts,
};
