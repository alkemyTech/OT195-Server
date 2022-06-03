const { Public } = require("../models");

const getPublic = async(req, res, next) => {

  const { name, image, phone, address, email, welcomeTitle, welcomeText } = await Public.findOne({
    where: {
      id: 1
    }
  });

  // Public data
  const results = {
    name,
    image,
    phone,
    address,
    email,
    welcomeTitle,
    welcomeText,
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
        {
          text: "Contribuye",
          route: "/contribute",
        },
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

module.exports = {
  getPublic,
};
