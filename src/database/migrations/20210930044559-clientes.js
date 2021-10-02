'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('clientes', { 
       id:{
        type: Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
       },
       nome:{
         type: Sequelize.STRING,
         allowNull:false
       }
      });
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.dropTable('clientes');
  }
};
