const ItemPedido = require("../model/ItemPedido");	
const Pedido = require("../model/Pedido");	
const Produto = require("../model/Produto");	

module.exports = {		
  async find(req, res) {	
    const { pedido_id } = req.params;	
    const pedido = await Pedido.findByPk(pedido_id);	

    if (pedido) {	
      const item = await ItemPedido.findAll({	
        where: { pedido_id },	
        include: { model: Produto, as: "produto" },	
      });	
      return res.json(item);	
    }	
    return res.json({	
      message: "Não foi possível encontrar items do pedido informado.",	
    });	
  },	

};	
