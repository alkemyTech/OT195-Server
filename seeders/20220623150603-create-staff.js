"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Members", [
      {
        name: "María Garcia",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655953410/ovaqie0kav2d6nxxxbge.jpg",
        role: "Fundadora",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Rodrigo Fuente",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655956195/a8ilvprdyge8erqt2qhx.jpg",
        role: "Fundador",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      {
        name: "Maria Irola",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655952317/g7fevhtofy0tozflwmir.jpg",
        role: "Presidente",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marita Gomez",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655956219/xaqvvbb5gdjqx4sgngzt.jpg",
        role: "Colaboradora",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Miriam Rodriguez",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655997849/c17knrgihgggir07p2kk.jpg",
        role: "Colaboradora",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Cecilia Mendez",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655953559/qvwojwfanbedsxxpyump.jpg",
        role: "Colaboradora",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Marco Fernandez",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655953645/ixvlknof9gqzktbotjmd.jpg",
        role: "Colaborador",
        description: `<p>Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña. Texto con descripcion de la persona y rol que desempeña.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Members", null, {});
  },
};
