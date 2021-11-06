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
    this.belongsTo(models.Cliente, { foreignKey: "cliente_id", as: "Cliente" });
  }

}

module.exports = Pedido;
