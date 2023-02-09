import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('reacoes', table => {
        table.increments('id').primary();
        
        table.integer('idQuemDeixou')
        .notNullable()
        .references('id')
        .inTable('usuarios');

        table.integer('idQuemGanhou')
        .notNullable()
        .references('id')
        .inTable('usuarios');      
        
        table.string('tipo').notNullable();

        
        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('reacoes');
}