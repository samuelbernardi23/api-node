# Api em Node.js

### Versions
Node:``14.15.4``
Yarn: ``1.22.11``
Npm:``14.15.4``
Sequelize:``6.6.5``

### Pré-requisitos
A base de dados utilizada neste projeto é MySql.
Os arquivos de configuração estão em ``src/config/database.js``.

### Install
Está sendo utilizando o ``yarn`` na versão 1.22.11 como gerenciador de pacotes.
Instale as dependências com ``yarn install``.

### Migrations
Tendo isso configurado precisamos executar as migrations para criar a estrutura necessária no banco de dados.
para isso execute ``yarn sequelize db:migrate`` para execuar as migrations.

### Start
Execute ``yarn dev`` no diretório raiz.

### Chamadas a API
Json para importar no Insomnia
