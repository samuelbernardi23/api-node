'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     await queryInterface.createTable('Clientes', { 
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
     await queryInterface.dropTable('Clientes');
  }
};
