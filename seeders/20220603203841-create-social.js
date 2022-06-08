'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Socials', [{
      name: 'Facebook',
      url: 'www.facebook.com/AlkemyLATAM/',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'Instagram',
      url: 'www.instagram.com/alkemy__/',
      createdAt: new Date,
      updatedAt: new Date
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/company/alkemy2020/?originalSubdomain=arwww.instagram.com/alkemy__/',
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
