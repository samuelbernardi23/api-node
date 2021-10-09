const Cliente = require("../model/Cliente");

module.exports = {
  async store(req, res) {
    const { nome } = req.body;

    try{
      const cliente = await Cliente.create({ nome });
      console.log(cliente);
      return res.json(cliente);

    }catch{
      res.json({message:"Não foi possível inserir registro."})
    }

  },
  async find(req, res) {
    try{
      const cliente = await Cliente.findAll();
      return res.json(cliente);

    }catch{
      res.json({message:"Não foi possível encontrar registro."})
    }
  },
  async delete(req, res) {
    const { cliente_id } = req.params;
      const cliente = await Cliente.findByPk(cliente_id);
      if(cliente){
        cliente.destroy();
        return res.json(cliente);
      }

      res.json({message:"Não foi possível deletar o registro."})
  }
};
