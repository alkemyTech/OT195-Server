"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Activities",
      [
        {
          name: "Apoyo Escolar para el nivel Primario",
          content:
            "<p>El espacio de apoyo escolar es el coraz&oacute;n del &aacute;rea educativa. Se realizan los talleres de lunes a jueves de 10 a 12 horas y de 14 a 16 horas en el contraturno. Los s&aacute;bados tambi&eacute;n se realiza el taller para ni&ntilde;os y ni&ntilde;as que asisten a la escuela doble turno. Tenemos un espacio especial para los de 1er grado 2 veces por semana ya que ellos necesitan atenci&oacute;n especial! Actualmente se encuentran inscriptos a este programa 150 ni&ntilde;os y ni&ntilde;as de 6 a 15 a&ntilde;os. Este taller est&aacute; pensado para ayudar a los alumnos con el material que traen de la escuela, tambi&eacute;n tenemos una docente que les da clases de lengua y matem&aacute;tica con una planificaci&oacute;n propia que armamos en Manos para nivelar a los ni&ntilde;os y que vayan con m&aacute;s herramientas a la escuela.</p>",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Apoyo Escolar Nivel Secundaria",
          content:
            "<p>Del mismo modo que en primaria, este taller es el coraz&oacute;n del &aacute;rea secundaria. Se realizan talleres de lunes a viernes de 10 a 12 horas y de 16 a 18 horas en el contraturno. Actualmente se encuentran inscriptos en el taller 50 adolescentes entre 13 y 20 a&ntilde;os. Aqu&iacute; los jovenes se presentan con el material que traen del colegio y una docente de la instituci&oacute;n y un grupo de voluntarios los recibe para ayudarlos a estudiar o hacer la tarea. Este espacio tambi&eacute;n es utilizado por los j&oacute;venes como un punto de encuentro y relaci&oacute;n entre ellos y la instituci&oacute;n.</p>",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: "Tutorías",
          content:
            "<p>Es un programa destinado a j&oacute;venes a partir del tercer a&ntilde;o de secundaria, cuyo objetivo es garantizar su permanencia en la escuela y construir un proyecto de vida que da sentido al colegio. El objetivo de esta propuesta es lograr la integraci&oacute;n escolar de ni&ntilde;os y j&oacute;venes del barrio promoviendo el soporte socioeducativo y emocional apropiado, desarrollando los recursos institucionales necesarios a trav&eacute;s de la articulaci&oacute;n de nuestras intervenciones con las escuelas que los alojan, con las familias de los alumnos y con las instancias municipales, provinciales y nacionales que correspondan. El programa contempla:</p><ul><li>Encuentro semanal con tutores (individuales y grupales)</li><li>Actividad proyecto (los participantes del programa deben pensar una actividad relacionada a lo que quieren hacer una vez terminada la escuala y su tutor los acompa&ntilde;a en el proceso)</li><li>Ayudant&iacute;as (los que comienzan el 2do a&ntilde;o del programa deben elegir una de las actividades que se realizan en la instituci&oacute;n para acompa&ntilde;arla e ir conociendo como es el mundo laboral que les espera).</li><li>Acompa&ntilde;amiento escolar y familiar (los tutores son encargados de articular con la familia y con las escuelas de los j&oacute;venes para monitorear el estado de los tutorados)</li><li>Beca est&iacute;mulo (los j&oacute;venes reciben una beca est&iacute;mulo que es supervisada por los tutores). Actualmente se encuentran inscriptos en el programa 30 adolescentes.</li><li>Taller Arte y Cuentos: Taller literario y de manualidades que se realiza semanalmente.</li><li>Paseos recreativos y educativos: Estos paseos est&aacute;n pensados para promover la participaci&oacute;n y sentido de pertenencia de los ni&ntilde;os, ni&ntilde;as y adolescentes al &aacute;rea educativa.</li></ul>",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
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
