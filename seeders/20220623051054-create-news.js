"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("Entries", [
      {
        name: "Red Puntos de Cultura en Somos Más",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655961496/foto-puntos-de-cultura_tl9m0z.jpg",
        content: `<p>En en mes de julio mantuvimos una reunión, de manera virtual, con el Ministro de Cultura Tristán Bauer y el conjunto de organizaciones que formamos parte de la Red Puntos de Cultura de la Provincia de Buenos Aires.<br>Hablamos de los proyectos en marcha y los que están por venir y debatimos acerca de los desafíos que se nos presentan en el contexto actual.<br>Seguimos siendo parte de esta Red que promueve espacios culturales y proyectos artísticos de manera colectiva y federal.</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Registro de Pequeñas Unidades Productivas de Alimentos",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655961369/DSC09315_h8ntxa.jpg",
        content: `<p>Desde el mes de mayo de 2022, instituciones y emprendedores de la Economía Social y Solidaria, presentaron una proyecto al Honorable Concejo Deliberante para regular la producción segura de alimentos de bajo riesgo epidemiológico en el ámbito del Partido de Gral Pueyrredon.<br>
            El objetivo de este proyecto es generar una normativa que atienda a las particularidades de familias y grupos emprendedores que se dedican a la elaboración de alimentos de pequeña escala, ya que están organizados con una lógica diferente a la del sector empresarial y, que requieren regulaciones específicas.<br>
            Dicho proyecto crea un registro local para que los pequeños productores de alimentos puedan registrar su sala de elaboración, reciban asesoramiento técnico, capacitación y el control necesario para asegurar la inocuidad de los alimentos.<br>
            Con las convicciones del hacer colectivo, con el orgullo de ser parte de una propuesta inclusiva e innovadora… ¡Sigamos adelante!</p>`,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Nueva actividad de la Red de Educación en Balcarce",
        image:
          "https://res.cloudinary.com/dcd14hpmu/image/upload/v1655961251/balcarce_leadgb.jpg",
        content:
          "<p>Más de 100 chicos del barrio Belgrano del partido de Balcarce participaron de la primera actividad recreativa cultural en el marco del trabajo que Somos Más viene desarrollando con organizaciones barriales, junto a la Fundación de Organizaciones Comunitarias (FOC) y la Red de Organizaciones Sociales por el Derecho a la Educación. Los chicos pudieron disfrutar de un partidito de fútbol, de una rica chocolatada, de actividades artísticas, pintura, dibujo, de música y de baile.</p>",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
