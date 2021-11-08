const Cliente = require("../model/Cliente");
const Pedido = require("../model/Pedido");

module.exports = {
  async store(req, res) {
    const { nome } = req.body;

    try {
      const cliente = await Cliente.create({ nome });
      return res.json(cliente);
    } catch (error) {
      res.json(error);
    }
  },
  async find(req, res) {
    const { id } = req.query;

    try {
      if (id) {
        const cliente = await Cliente.findByPk(id);
        return res.json(cliente);

      } else {
        const cliente = await Cliente.findAll();
        return res.json(cliente);
      }
    } catch (error) {
      res.json(error);
    }
  },

  async update(req, res) {
    const { id, nome } = req.body;

    try {
      const cliente = await Cliente.findByPk(id);
      cliente.update({ nome });

      return res.json(cliente);
    } catch (error) {
      res.json(error);
    }
  },

  async delete(req, res) {
    const { cliente_id } = req.params;

    const find = await Pedido.findAll({ where: { cliente_id } });

    if (find.length > 0) {
      res.status(400)
      return res.json({ message: "Cliente está sendo utilizado em um ou mais pedidos e não pode ser excluído." })
    }

    try {
      const cliente = await Cliente.findByPk(cliente_id);
      cliente.destroy();
      return res.json(cliente);
    } catch (error) {
      res.json(error);
    }
  },
};
