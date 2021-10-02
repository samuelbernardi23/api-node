const { Model, DataTypes } = require("sequelize");

class ItemPedido extends Model {
  static init(sequelize) {
    super.init(
      {
        quantidade: DataTypes.INTEGER,
        preco_unitario: DataTypes.REAL,
        valor_total: DataTypes.REAL,
      },
      { sequelize }
    );
  }

  static associate(models) {
    this.belongsTo(models.Produto, { foreignKey: "produto_id", as: "produto" });
    this.belongsTo(models.Pedido, { foreignKey: "pedido_id", as: "pedido" });
  }
}

module.exports = ItemPedido;
