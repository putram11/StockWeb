'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const data = require("../data/user.json").map((el) => {
      const { id, ...rest } = el;
      return {
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    // console.log(data)
    await queryInterface.bulkInsert("Users", data)

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", data)
  }
};
