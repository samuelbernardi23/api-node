const { Model, DataTypes } = require("sequelize");

class Pedido extends Model {
  static init(sequelize) {
    super.init(
      {
        valor_total: DataTypes.REAL,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Pedido, { foreignKey: "cliente_id", as: "cliente" });
  }

}

module.exports = Pedido;
