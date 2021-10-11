const Pedido = require("../model/Pedido");
const Cliente = require("../model/Cliente");
const Produto = require("../model/Produto");
const ItemPedido = require("../model/ItemPedido");

module.exports = {
  async find(req, res) {
    try {
      const pedidos = await Pedido.findAll();
      return res.json(pedidos);
    } catch {
      res.json({ message: "Não foi possível encontrar pedidos." });
    }
  },
  async store(req, res) {
    const { cliente_id, items } = req.body;

    const cliente = await Cliente.findByPk(cliente_id);
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
      items
        .map((i) => {
          Object.assign(i, {
            valor_total: i.quantidade * i.preco_unitario,
            pedido_id: pedido_id,
          });
          return i.preco_unitario * i.quantidade;
        })
        .reduce((i, e) => i + e);

      try {
        await ItemPedido.bulkCreate(items)
          .then((r) => {
            return res.json({
              message: "Pedido inserido com sucesso.",
            });
          })
          .catch((err) => {
            res.json(err);
          });
      } catch (error) {
        return res.json({
          message: "Não foi possivel atualizar os itens do pedido.",
        });
      }
    } else {
      res
        .status(404)
        .json({ error: `Houve um problema ao cadastrar o pedido` });
    }
  },

  async update(req, res) {
    const { pedido_id, items } = req.body;

    if (!pedido_id) {
      return res.json({ message: "Pedido id não informado" });
    }

    const valor_total = items
      .map((i) => {
        Object.assign(i, {
          valor_total: i.quantidade * i.preco_unitario,
          pedido_id: pedido_id,
        });
        return i.preco_unitario * i.quantidade;
      })
      .reduce((i, e) => i + e);

    try {
      await ItemPedido.destroy({
        where: { pedido_id: pedido_id },
      });
      const pedido = await Pedido.findByPk(pedido_id);
      await pedido.update({ valor_total: valor_total });

      try {
        await ItemPedido.bulkCreate(items)
          .then((r) => {
            return res.json({
              message: "Pedido atualizado com sucesso.",
            });
          })
          .catch((err) => {
            res.json(err);
          });
        } catch (error) {
          res.json(error);
        }
    } catch (error) {
      res.json(error);
    }
  },
  async delete(req, res) {
    const { pedido_id } = req.params;
    try {
      await ItemPedido.destroy({ where: { pedido_id } });
      await Pedido.destroy({ where: { id: pedido_id } });

      return res.json({
        message: "Pedido excluído com sucesso.",
      });
    } catch (error) {
      res.json(error);
    }
  },
};
