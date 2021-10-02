const { Model, DataTypes } = require("sequelize");

class Produto extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: DataTypes.STRING,
        preco_unitario: DataTypes.REAL,
        multiplo: DataTypes.INTEGER,
      },
      { sequelize }
    );
  }
}

module.exports = Produto;
