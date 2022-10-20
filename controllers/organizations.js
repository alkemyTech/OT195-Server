const { Public, Social } = require("../models");

const getPublic = async (req, res) => {
  const { name, image, phone, address, email, welcomeTitle, welcomeText, welcomeImage} =
    await Public.findOne({
      where: {
        id: 1,
      },
    });

  const socialMedia = await Social.findAll();

  // Public data
  const results = {
    name,
    image,
    phone,
    address,
    email,
    welcomeTitle,
    welcomeText,
    welcomeImage,
    socialMedia,
    nav: {
      items: [
        {
          text: "Inicio",
          route: "/home",
        },
        {
          text: "Nosotros",
          route: "/staff",
        },
        {
          text:"Actividades",
          route: "/activities",
        },
        {
          text: "Novedades",
          route: "/news",
        },
        {
          text: "Testimonios",
          route: "/testimonials",
        },
        {
          text: "Contacto",
          route: "/contact",
        },
        // {
        //   text: "Contribuye",
        //   route: "/contribute",
        // },
      ],
      buttons: [
        {
          role: "none",
          text: "Log In",
          style: "secondary",
          route: "/login",
        },
        {
          role: "none",
          text: "Registrate",
          style: "primary",
          route: "/signup",
        },
        {
          role: "1",
          text: "Backoffice",
          style: "primary",
          route: "/backoffice",
        },
        {
          role: "2",
          text: "Mi Perfil",
          style: "secondary",
          route: "/profile",
        },
        {
          role: "none",
          text: "Cerrar Sesión",
          style: "primary",
          route: "/signup",
        },
      ],
    },
  };
  res.status(200).json({
    results,
    ok: true,
  });
};

const modifyPublic = async (req,res) =>{
  //const { name, image } = req.body
  
  try {
    await Public.update(req.body, {where: {id: 1}})
    res.status(200).json("Organization data sucessfully edited")
  } catch (error) {
      res.status(400).json(error.message)
  }

}

module.exports = {
  getPublic,
  modifyPublic
};
