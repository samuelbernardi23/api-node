const { Model, DataTypes } = require("sequelize");

class Cliente extends Model{
   static init(sequelize){
      super.init({
         nome:DataTypes.STRING
      }, {sequelize})
   }
}

module.exports = Cliente;