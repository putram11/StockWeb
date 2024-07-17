'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    return queryInterface.bulkInsert('Investments', [
      {
        name: 'Investment1',
        value: 1000.0,
        description: 'Investment in AAPL',
        userId: 2,
        stockId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Investment2',
        value: 2000.0,
        description: 'Investment in GOOGL',
        userId: 3,
        stockId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      // Add other investments here
    ], {});
  },


  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Investments", data)
  }
};
