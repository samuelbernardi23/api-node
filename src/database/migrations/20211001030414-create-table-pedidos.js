"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Pedidos",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cliente_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{ model: "Clientes", key: 'id' }
        },
        valor_total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Pedidos");
  },
};
