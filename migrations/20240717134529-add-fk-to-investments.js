'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn(`Investments`, `userId`, {
      type: Sequelize.INTEGER,
      references: {
        model: `Users`,
        key: `id`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    })
    await queryInterface.addColumn(`Investments`, `stockId`, {
      type: Sequelize.INTEGER,
      references: {
        model: `Stocks`,
        key: `id`
      },
      onDelete: `cascade`,
      onUpdate: `cascade`
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn(`Investments`, `userId`)
    await queryInterface.removeColumn(`Investments`, `stockId`)
  }
};
