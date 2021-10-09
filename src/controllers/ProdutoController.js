const Produto = require("../model/Produto");

module.exports = {
  async store(req, res) {
    const { nome, preco_unitario, multiplo } = req.body;

    try{
      const produto = await Produto.create({ nome, preco_unitario, multiplo });
      return res.json(produto);

    }catch{
      res.json({message:"Não foi possível inserir o produto."})
    }

  },
  async find(req, res) {
    try{
      const produto = await Produto.findAll();
      let result = produto.map(i=> {
        i.preco_unitario = parseInt(i.preco_unitario)
        console.log(i);
        return i
      })
      return res.json(result);

    }catch{
      res.json({message:"Não foi possível encontrar produtos."})
    }
  },

  async update(req, res) {
    const { id, nome, preco_unitario, multiplo } = req.body;
    console.log(req.body);
    
    try {
      const produto = await Produto.findByPk(id);
      produto.update({nome, preco_unitario, multiplo});

      return res.json(produto);
    } catch {
      res.json({ message: "Não foi possível atualizar o registro." });
    }
  },

  async delete(req, res) {
    const { produto_id } = req.params;

    try{
      const produto = await Produto.findByPk(produto_id);
      produto.destroy();
      return res.json(produto);

    }catch{
      res.json({message:"Não foi possível deletar o produto."})
    }
  }
};
