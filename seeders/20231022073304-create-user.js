"use strict";
const { User } = require("../models");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Users", [
      {
        name: "Superadmin1",
        address: "Palu",
        age: 20,
        role: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Superadmin2",
        address: "Palu",
        age: 20,
        role: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Superadmin3",
        address: "Palu",
        age: 20,
        role: "SuperAdmin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    const users = await User.findAll();

    await queryInterface.bulkInsert("Auths", [
      {
        email: "superadmin1@gmail.com",
        password:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        confirmPassword:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        userId: users[0].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "superadmin2@gmail.com",
        password:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        confirmPassword:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        userId: users[1].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "superadmin3@gmail.com",
        password:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        confirmPassword:
          "$2a$10$xpMKCgcPVkMmBSajFkV.SOwP6DDaelMBRuzUZVTTYHQvyh9wKQIo6",
        userId: users[2].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
    await queryInterface.bulkDelete("Auths", null, {});
  },
};
