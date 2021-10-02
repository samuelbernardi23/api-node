const Pedido = require("../model/Pedido");
const Cliente = require("../model/Cliente");
const Produto = require("../model/Produto");
const ItemPedido = require("../model/ItemPedido");

module.exports = {
  async store(req, res) {
    const { cliente_id, items } = req.body;

    const cliente = Cliente.findByPk(parseInt(cliente_id));
    if (!cliente) {
      return res
        .status(400)
        .json({ error: "Cliente não encontrado na base de dados." });
    }
    const valor_total = items
      .map((i) => i.preco_unitario * i.quantidade)
      .reduce((i, e) => i + e);
    const pedido = await Pedido.create({ cliente_id, valor_total });

    if (pedido) {
      const pedido_id = pedido.dataValues.id;

      items.map(async (item) => {
        const { produto_id, quantidade, preco_unitario } = item;

        const find_pedido = await Pedido.findByPk(pedido_id);
        if (find_pedido) {
          const produto = await Produto.findByPk(produto_id);
          if (produto) {
            const valor_total = quantidade * preco_unitario;
            const itempedido = await ItemPedido.create({
              pedido_id,
              produto_id,
              quantidade,
              preco_unitario,
              valor_total,
            });
            return res.json(itempedido);
          } else {
            res.status(404).json({
              error: `Produto id (${produto_id}) não foi encontrado.`,
            });
          }
        } else {
          res
            .status(404)
            .json({ error: `Pedido id (${pedido_id}) não foi encontrado.` });
        }
      });
    } else {
      res
        .status(404)
        .json({ error: `Houve um problema ao cadastrar o pedido` });
    }

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
