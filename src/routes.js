const express = require("express");
const ClienteController = require('./controllers/ClienteController');
const ProdutoController = require('./controllers/ProdutoController');
const PedidoController = require('./controllers/PedidoController');
const ItemPedidoController = require('./controllers/ItemPedidoController');

const routes = express.Router();

routes.get("/clientes", ClienteController.find);
routes.post("/clientes", ClienteController.store);
routes.patch("/clientes", ClienteController.update);
routes.delete("/clientes/:cliente_id", ClienteController.delete);

routes.get("/produtos", ProdutoController.find);
routes.post("/produtos", ProdutoController.store);
routes.patch("/produtos", ProdutoController.update);
routes.delete("/produtos/:produto_id", ProdutoController.delete);

routes.get("/pedidos/:pedido_id?", PedidoController.find)
routes.post("/pedidos", PedidoController.store)
routes.patch("/pedidos", PedidoController.update)
routes.delete("/pedidos/:pedido_id", PedidoController.delete);

routes.get("/itempedidos/:pedido_id", ItemPedidoController.find)

module.exports = routes;
