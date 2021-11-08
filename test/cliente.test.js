
const common = require('./core/common')
const BASE_URL = common.BASE_URL;
const chai = common.chai;
const expect = common.expect;

const url = BASE_URL + "/clientes";

describe("Cliente", function () {
  let idCliente; //Id que será inserido após criar um cliente
  let clienteModel = {
    nome: "Novo cliente" // Nome que será inserido ao criar
  };

  it('Deve criar um cliente corretamente', function (done) {
    chai.request(BASE_URL)
      .post('/clientes')
      .send(clienteModel)
      .end((err, res) => {
        const body = res.body
        expect(body).to.have.property('id');
        expect(body).to.have.property('nome');
        idCliente = body.id;
        done();

      });
  });

  it("Deve retornar uma lista de clientes", function (done) {
    chai.request(BASE_URL)
      .get('/clientes')
      .end((err, res) => {
        const body = res.body
        const cliente = body[0];

        expect(body).to.be.not.empty;
        expect(cliente).to.have.property('id');
        expect(cliente).to.have.property('nome');
        idCliente = body.id;

        done();
      });

  });

  it("Deve alterar um cliente", function (done) {
    chai.request(BASE_URL)
      .patch('/clientes')
      .send({
        id: idCliente,
        nome: "Novo cliente alterado"
      })
      .end((err, res) => {
        const body = res.body

        expect(body.id).to.be.equal(idCliente);
        expect(body.nome).to.be.not.equal(clienteModel.nome);
        idCliente = body.id;

        done();
      });
  });

  it("Deve exlcuir o cliente inserido", function (done) {
    chai.request(BASE_URL)
      .delete(`/clientes/${idCliente}`)
      .end((err, res) => {
        const body = res.body;

        expect(body.id).to.be.equal(idCliente);
        done();
      });
  });



  it("Deve não encontrar o cliente anteriormente removido", function (done) {
    chai.request(BASE_URL)
      .get(`/clientes?id=${idCliente}`)
      .end((err, res) => {
        const body = res.body;

        expect(body).to.be.equal(null);

        done();
      });
  });
});