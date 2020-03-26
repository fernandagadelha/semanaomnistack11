
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments();
        //para a criação dos casos, podemos usar um negócio do knex que é o increments, para ir
        //aumentando o número. Faz sentido, pois os casos podem ser identificados como 1, 2 e tal


        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();
        
        table.string('ong_id').notNullable();
        //coluna pra armazenar qual ong criou esse incidente (o caso)

        table.foreign('ong_id').references('id').inTable('ongs');
        //criar a chave-estrangeira, que vamos falar que toda vez que o ong_id for preenchido,
        //ele precisa ser de uma ong que está cadastrada dentro da tabela ong

      

    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
  
};
