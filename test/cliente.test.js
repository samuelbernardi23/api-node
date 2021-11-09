
const common = require('./core/common')
const BASE_URL = common.BASE_URL;
const chai = common.chai;
const expect = common.expect;
const wait = common.wait;

describe("Cliente", () => {
  let idCliente; //Id que será inserido após criar um cliente
  let clienteModel = {
    nome: "Novo cliente" // Nome que será inserido ao criar
  };

  it('Deve inserir um cliente corretamente', (done) => {
    chai.request(BASE_URL)
      .post('/clientes')
      .send(clienteModel)
      .end((err, res) => {
        const body = res.body

        expect(body).to.have.property('id');
        expect(body).to.have.property('nome');

        idCliente = body.id;
        wait(done, 1000);
      });
  });

  it('Deve encontrar o cliente anteriormente inserido', (done) => {
    chai.request(BASE_URL)
      .get(`/clientes?id=${idCliente}`)
      .end((err, res) => {
        const body = res.body;

        expect(body.id).to.be.equal(idCliente);

        wait(done, 1000);
      });
  });

  it("Deve retornar uma lista de clientes", (done) => {
    chai.request(BASE_URL)
      .get('/clientes')
      .end((err, res) => {
        const body = res.body
        const cliente = body[0];

        expect(body).to.be.not.empty;
        expect(cliente).to.have.property('id');
        expect(cliente).to.have.property('nome');

        wait(done, 1000);
      });

  });

  it("Deve alterar um cliente", (done) => {
    const cliente = {
      id: idCliente,
      nome: "Novo cliente alterado"
    };
    chai.request(BASE_URL)
      .patch('/clientes')
      .send(cliente)
      .end((err, res) => {
        const body = res.body

        expect(body.id).to.be.equal(idCliente);
        expect(body.nome).to.be.not.equal(clienteModel.nome);
        expect(body.nome).to.be.equal(cliente.nome);

        wait(done, 1000);
      });
  });

  it("Deve exlcuir o cliente inserido", (done) => {
    chai.request(BASE_URL)
      .delete(`/clientes/${idCliente}`)
      .end((err, res) => {
        const body = res.body;

        expect(body.id).to.be.equal(idCliente);

        wait(done, 1000);
      });
  });

  it("Deve não encontrar o cliente anteriormente removido", (done) => {
    chai.request(BASE_URL)
      .get(`/clientes?id=${idCliente}`)
      .end((err, res) => {
        const body = res.body;
        expect(body).to.be.equal(null);

        wait(done, 1000);
      });
  });
});