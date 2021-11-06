
const BASE_URL = require("./environment").url;
var request = require("request");
var chai = require("chai");
var expect = chai.expect;

const url = BASE_URL + "/clientes";

describe("Cliente", function() {
  let idCliente; //Id que será inserido após criar um cliente
  let cliente = {
    nome: "Novo cliente" // Nome que será inserido ao criar
  };

  it('deve criar um cl iente corretamente', function(done) {

    request.post({ url, json: true, body: cliente }, (error, response, body) => {
      idCliente = body.id;
      expect(body).to.have.property('id');
      expect(body).to.have.property('nome');

      done();
    });


  });

  it("deve retornar uma lista de clientes", function(done) {
    request.get(url, (error, response, body) => {
      body = JSON.parse(body);
      const cliente = body[0];

      expect(body).to.be.not.empty;

      expect(cliente).to.have.property('id');
      expect(cliente).to.have.property('nome');

      done();
    });
  });

  it("deve alterar um cliente", function(done) {
    request.patch({ url, json: true, body: { id: idCliente, nome: "Novo cliente alterado" } }, (error, response, body) => {
      expect(body.id).to.be.equal(idCliente);
      expect(body.nome).to.be.not.equal(cliente.nome);

      done();
    });
  });

  it("deve exlcuir o cliente inserido", function(done) {
    request.delete(`${url}/${idCliente}`, {}, (error, response, body) => {
      body = JSON.parse(body);

      expect(body.id).to.be.equal(idCliente);

      done();
    });
  });

  it("deve não encontrar o cliente anteriormente removido", function(done) {
    request.get(`${url}?id=${idCliente}`, {}, (error, response, body) => {
      body = JSON.parse(body);
      
      expect(body).to.be.null;

      done();
    });
  });
});