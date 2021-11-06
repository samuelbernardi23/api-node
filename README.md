# Api em Node.js

### Versão do node utilizada: v14.15.4

A Aplicação foi desenvolvida com base em ORM, neste caso foi utilizado Sequelize em sua versão 6.6.5

### Pré-requisitos
Para funcionamento correto é necessário a base MySQL na máquina.
Os arquivos de configuração estão na pasta config no arquivo ``database.js``.
Está sendo utilizando o ``yarn`` na versão 1.22.11 como gerenciador de pacotes.

### Start
Após isso precisamos executar as migrations para criar a estrutura necessária no banco de dados.
para isso execute ``yarn sequelize db:migrate`` para execuar as migrations.

Para inicializar o projeto, basta apenas executar ``yarn install`` e após a instalação dos pacotes
``yarn dev`` no diretório raiz.

### json para Insomnia com as chamadas a API
https://drive.google.com/file/d/1NZWUrt2jFDDQSbyFAS0aASoMBy8FnSR7/view?usp=sharing
