
const common = require('./core/common')
const BASE_URL = common.BASE_URL;
const chai = common.chai;
const expect = common.expect;

describe("pedido", () => {
   let idCliente;
   let idProduto;
   let idPedido;

   it('Deve inserir um pedido corretamente', (done) => {
      const clienteModel = {
         nome: "Novo cliente"
      };
      //Insere um cliente
      chai.request(BASE_URL)
         .post('/clientes')
         .send(clienteModel)
         .end((err, res) => {
            const body = res.body
            expect(body).to.have.property('id');
            expect(body).to.have.property('nome');

            idCliente = body.id;

            const produtoModel = {
               nome: "Novo produto",
               preco_unitario: 1000,
               multiplo: 3
            };
            //Insere um produto
            chai.request(BASE_URL)
               .post('/produtos')
               .send(produtoModel)
               .end((err, res) => {
                  const body = res.body
                  expect(body).to.have.property('id');
                  expect(body).to.have.property('nome');
                  expect(body).to.have.property('preco_unitario');
                  expect(body).to.have.property('multiplo');

                  idProduto = body.id;

                  // Por fim o pedido
                  const pedidoModel = {
                     cliente_id: idCliente,
                     items: [
                        {
                           produto_id: idProduto,
                           quantidade: 2,
                           preco_unitario: 20
                        }
                     ]
                  };

                  chai.request(BASE_URL)
                     .post('/pedidos')
                     .send(pedidoModel)
                     .end((err, res) => {
                        const body = res.body

                        expect(body).to.have.property('message');
                        expect(body.message).to.be.equal('Pedido inserido com sucesso.');
                        idPedido = body.id;
                        done();
                     });
               });
         });
   });

   it('Deve encontrar o pedido anteriormente inserido', (done) => {
      chai.request(BASE_URL)
         .get(`/pedidos/${idPedido}`)
         .end((err, res) => {
            const body = res.body;

            expect(body.id).to.be.equal(idPedido);
            done();
         });
   });

   it('Deve alterar o pedido anteriormente inserido', (done) => {
      const altPedidoModel = {
         pedido_id: idPedido,
         items: [{
            produto_id: idProduto,
            quantidade: 10,
            preco_unitario: 40
         }]
      }

      chai.request(BASE_URL)
         .patch(`/pedidos`)
         .send(altPedidoModel)
         .end((err, res) => {
            const body = res.body;

            expect(body.id).to.be.equal(idPedido);
            done();
         });
   });

   it('Deve excluir o pedido anteriormente inserido', (done) => {
      chai.request(BASE_URL)
         .delete(`/pedidos/${idPedido}`)
         .end((err, res) => {
            const body = res.body;

            expect(body).to.have.property('message');
            expect(body.message).to.be.equal('Pedido excluído com sucesso.');

            done();
         });
   });

   it('Deve não encontrar o pedido anteriormente excluído', (done) => {
      chai.request(BASE_URL)
         .get(`/pedidos/${idPedido}`)
         .end((err, res) => {
            const body = res.body;

            expect(body).to.be.equal(null);

            done();
         });
   });
});
