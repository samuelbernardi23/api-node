"use strict";
const { DataTypes } = require('sequelize');
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Produtos", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      preco_unitario: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
      },
      multiplo: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Produtos");
  },
};
