

exports.up = function(knex) {
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable();
        //esse 2 é indicando o tamanho do texto, a quantidade de caracteres que sabemos que vai ser armazenado. Nesse caso, como
        //é referente ao estado, sabemos que são duas letras, por exemplo CE, BA etc

    });
      //o método UP é onde sempre responsável pela criação da tabela
  
};

exports.down = function(knex) {
    return knex.schema.dropTable('ongs');
};

//o método down é usado caso tenha algum problema e eu precise voltar atrás, deletar uma tabela, voltar atrás da criação 
//de uma tabela, é para desfazer

//na documentação do knex, eu encontro tudo sobre como fazer migrations e mais
//é só copiar e colar esses códigos, fazendo as adaptações devidas para a nossa aplicação

//notNullable significa que esse campo não pode ficar nulo, ou seja, tem que ser preenchido pelo usuário