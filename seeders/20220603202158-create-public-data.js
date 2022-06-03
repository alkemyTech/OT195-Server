'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Public', [{
      name: 'Somos Más',
      image: '/images/logo.png',
      phone: '1160112988',
      address: "",
      email: "somosfundacionmas@gmail.com",
      welcomeTitle: "Hola! Bienvenidx",
      welcomeText: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Adipiscing dignissim ac et eleifend lacus, rhoncus, dignissim sagittis. Tellus ac a, elementum ut. Tellus a morbi tincidunt ultricies malesuada eget turpis. Lacus enim non enim, velit hac turpis interdum arcu. Suspendisse at vel ultrices amet orci enim lectus porttitor ut.",
      createdAt: new Date,
      updatedAt: new Date
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
