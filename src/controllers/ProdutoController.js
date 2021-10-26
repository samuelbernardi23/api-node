const Produto = require("../model/Produto");

module.exports = {
  async store(req, res) {
    const { nome, preco_unitario, multiplo } = req.body;

    try {
      const produto = await Produto.create({ nome, preco_unitario, multiplo });
      return res.json(produto);
    } catch (error) {
      res.json(error);
    }
  },
  async find(req, res) {
    const { id } = req.query;

    try {
      if (id) {
        const produto = await Produto.findByPk(id);
        return res.json(produto);

      }
      const produto = await Produto.findAll();

      return res.json(produto);
    } catch (error) {
      res.json(error);
    }
  },

  async update(req, res) {
    const { id, nome, preco_unitario, multiplo } = req.body;

    try {
      const produto = await Produto.findByPk(id);
      produto.update({ nome, preco_unitario, multiplo });

      return res.json(produto);
    } catch (error) {
      res.json(error);
    }
  },

  async delete(req, res) {
    const { produto_id } = req.params;

    try {
      const produto = await Produto.findByPk(produto_id);
      produto.destroy();
      return res.json(produto);
    } catch (error) {
      res.json(error);
    }
  },
};
