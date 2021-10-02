const Sequelize = require('sequelize');
const configDb = require('../config/database');

const Cliente = require('../model/Cliente');
const Produto = require('../model/Produto');
const Pedido = require('../model/Pedido');
const ItemPedido = require('../model/ItemPedido');

const connection = new Sequelize(configDb);
   
Cliente.init(connection);
Produto.init(connection);
Pedido.init(connection);
ItemPedido.init(connection);

Pedido.associate(connection.models);
ItemPedido.associate(connection.models);

module.exports = connection;
