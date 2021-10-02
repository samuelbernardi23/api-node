const ItemPedido = require("../model/ItemPedido");
const Pedido = require("../model/Pedido");
const Produto = require("../model/Produto");

module.exports = {
  async store(req, res) {
    const { pedido_id } = req.params;
    const { produto_id, quantidade, preco_unitario } = req.body;

    const pedido = await Pedido.findByPk(pedido_id);
    if (pedido) {
      const produto = await Produto.findByPk(produto_id);
      if (produto) {
        const valor_total = quantidade * preco_unitario;

        const item_pedido = await ItemPedido.create({
          pedido_id,
          produto_id,
          quantidade,
          preco_unitario,
          valor_total,
        });
        return res.json(item_pedido);
      } else {
        res
          .status(404)
          .json({ error: `Produto id (${produto_id}) não foi encontrado.` });
      }
    } else {
      res
        .status(404)
        .json({ error: `Pedido id (${pedido_id}) não foi encontrado.` });
    }
  },
  async find(req, res) {
    const { pedido_id } = req.params;
    const pedido = await Pedido.findByPk(pedido_id);

    if (pedido) {
      const item = await ItemPedido.findAll({ where: { pedido_id } });
      return res.json(item);
    }
    return res.json({
      message: "Não foi possível encontrar items do pedido informado.",
    });
  },
  async delete(req, res) {
    const { item_pedido_id } = req.params;

    const item_pedido = await ItemPedido.findByPk(item_pedido_id);
    if (item_pedido) {
      item_pedido.destroy();
      return res.json(item_pedido);
    }
    return res.json({
      message: `Item pedido (${item_pedido_id}) não encontrado.`,
    });
  },
};
