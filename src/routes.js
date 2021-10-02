const express = require("express");
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');
const ItemPedidoController = require('./controllers/ItemPedidoController');

const routes = express.Router();

routes.get("/clientes", ClienteController.find);
routes.post("/clientes", ClienteController.store);
routes.delete("/clientes", ClienteController.delete);

routes.get("/produtos", ProdutoController.find);
routes.post("/produtos", ProdutoController.store);
routes.delete("/produtos", ProdutoController.delete);

routes.get("/pedidos", PedidoController.find)
routes.post("/clientes/:cliente_id/pedidos", PedidoController.store)
routes.delete("/pedidos", PedidoController.delete);

routes.get("/itempedidos/:pedido_id", ItemPedidoController.find)
routes.post("/pedidos/:pedido_id/item_pedido", ItemPedidoController.store)
routes.delete("/itempedidos/:item_pedido_id", ItemPedidoController.delete);



module.exports = routes;
