
const common = require('./core/common')
const BASE_URL = common.BASE_URL;
const chai = common.chai;
const expect = common.expect;
const wait = common.wait;

describe("Produto", () => {
  let idProduto; //Id que será inserido após criar um produto
  let produtoModel = {// Modelo que será utilizado ao inserir um produto
    nome: "Novo produto",
    preco_unitario: 1000,
    multiplo: 3
  };

  it('Deve inserir um produto corretamente', (done) => {
    chai.request(BASE_URL)
      .post('/produtos')
      .send(produtoModel)
      .end((err, res) => {
        const body = res.body;

        expect(body).to.have.property('id');
        expect(body).to.have.property('nome');
        expect(body).to.have.property('preco_unitario');
        expect(body).to.have.property('multiplo');
        idProduto = body.id;

        wait(done, 1000);
      });

  });

  it("Deve retornar uma lista de produtos", (done) => {
    chai.request(BASE_URL)
      .get('/produtos')
      .end((err, res) => {
        const body = res.body;
        const produto = body[0];

        expect(body).to.be.not.empty;

        expect(produto).to.have.property('id');
        expect(produto).to.have.property('nome');
        expect(produto).to.have.property('preco_unitario');
        expect(produto).to.have.property('multiplo');

        wait(done, 1000);
      });
  });

  it("Deve alterar um produto", (done) => {
    chai.request(BASE_URL)
      .patch('/produtos')
      .send({
        id: idProduto,
        nome: "Novo produto alterado",
        preco_unitario: 4000,
        multiplo: 4
      })
      .end((err, res) => {
        const body = res.body;

        expect(body.id).to.be.equal(idProduto);
        expect(body.nome).to.be.not.equal(produtoModel.nome);
        expect(body.preco_unitario).to.be.not.equal(produtoModel.preco_unitario);
        expect(body.multiplo).to.be.not.equal(produtoModel.multiplo);

        wait(done, 1000);
      });
  });

  it("Deve exlcuir o produto anteriormente inserido", (done) => {
    chai.request(BASE_URL)
      .delete(`/produtos/${idProduto}`)
      .end((err, res) => {
        const body = res.body;

        expect(body.id).to.be.equal(idProduto);
        wait(done, 1000);
      });
  });

  it("Deve não encontrar o produto anteriormente removido", (done) => {
    chai.request(BASE_URL)
      .get(`/produtos?id=${idProduto}`)
      .end((err, res) => {
        const body = res.body;

        expect(body).to.be.equal(null);

        wait(done, 1000);
      });
  });
});