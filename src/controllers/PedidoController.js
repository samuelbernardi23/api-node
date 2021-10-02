const Pedido = require("../model/Pedido");
const Cliente = require("../model/Cliente");

module.exports = {
  async store(req, res) {
    const { cliente_id } = req.params;
    const { valor_total } = req.body;

    const cliente = Cliente.findByPk(parseInt(cliente_id));

    if (!cliente) {
      return res.status(400).json({ error: "Cliente não encontrado na base de dados." });
    }
    const pedido = await Pedido.create({ cliente_id, valor_total });
    return res.json(pedido);
  },
  async find(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      return res.json(pedidos);
    } catch {
      res.json({ message: "Não foi possível encontrar pedidos." });
    }
  },
  async delete(req, res) {
    const { id } = req.body;

    try {
      const pedido = await Pedido.findByPk(id);
      pedido.destroy();
      return res.json(pedido);
    } catch {
      res.json({ message: "Não foi possível deletar o pedido." });
    }
  },
};
