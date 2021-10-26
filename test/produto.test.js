
const BASE_URL = require("./environment").url;
var request = require("request");
var chai = require("chai");
var expect = chai.expect;

const url = BASE_URL + "/produtos";

describe("Produto", function () {
  let idProduto; //Id que será inserido após criar um produto
  let produto = {// Modelo que será utilizado ao inserir um produto
    nome: "Novo produto",
    preco_unitario: 1000,
    multiplo: 3
  };

  it('deve criar um ciente corretamente', function async(done) {

    request.post({
      url, json: true, body: produto
    }, (error, response, body) => {
      idProduto = body.id;

      expect(body).to.have.property('id');
      expect(body).to.have.property('nome');
      expect(body).to.have.property('preco_unitario');
      expect(body).to.have.property('multiplo');

      done();
    });


  });

  it("deve retornar uma lista de produtos", function async(done) {
    request.get(url, (error, response, body) => {
      body = JSON.parse(body);
      const produto = body[0];

      expect(body).to.be.not.empty;

      expect(produto).to.have.property('id');
      expect(produto).to.have.property('nome');
      expect(produto).to.have.property('preco_unitario');
      expect(produto).to.have.property('multiplo');

      done();
    });
  });

  it("deve alterar um produto", function async(done) {
    request.patch({
      url, json: true, body: {
        id: idProduto,
        nome: "Novo produto alterado",
        preco_unitario: 2000,
        multiplo: 5
      }
    }, (error, response, body) => {
      expect(body.id).to.be.equal(idProduto);

      expect(body.nome).to.be.not.equal(produto.nome);
      expect(body.preco_unitario).to.be.not.equal(produto.preco_unitario);
      expect(body.multiplo).to.be.not.equal(produto.multiplo);

      done();
    });
  });

  it("deve exlcuir o produto inserido", function async(done) {
    request.delete(`${url}/${idProduto}`, {}, (error, response, body) => {
      body = JSON.parse(body);

      expect(body.id).to.be.equal(idProduto);

      done();
    });
  });

  it("deve não encontrar o produto anteriormente removido", function async(done) {
    request.get(`${url}?id=${idProduto}`, {}, (error, response, body) => {
      body = JSON.parse(body);

      expect(body).to.be.null;

      done();
    });
  });
});