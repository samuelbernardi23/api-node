"use strict";
const { DataTypes } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable(
      "Itempedidos",
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        pedido_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{ model: "Pedidos", key: 'id' }
        },
        produto_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{ model: "Produtos", key: 'id' }
        },
        quantidade: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        preco_unitario: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        valor_total: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Itempedidos");
  },
};
