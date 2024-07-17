'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    const data = require("../data/userProfile.json").map((el) => {
      const { id, ...rest } = el;
      return {
        ...rest,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    })
    // console.log(data)
    await queryInterface.bulkInsert("UserProfiles", data)
  },

  async down(queryInterface, Sequelize) {

    await queryInterface.bulkDelete("UserProfiles", data)
  }
};
