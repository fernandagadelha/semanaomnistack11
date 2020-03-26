const knex = require('knex');
const configuration = require('../../knexfile');

//com essas duas linhas de código iniciais, importamos o knex e as configurações do banco de dados que fizemos no arquivo
//knexfile.js

const connection = knex(configuration.development);
//passamos a conexão de desenvolvimento, pois lembre que temos vários tipos de conexão dentro do arquivo knexfile.js dependendo da função dela
//nesse caso, precisamos da conexão para ambiente de desenvolvimento

module.exports = connection;