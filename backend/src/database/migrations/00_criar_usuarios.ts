import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('usuarios', table => {
        table.increments('id').primary();
        table.string('apelido').unique().notNullable();
        table.string('senha').notNullable();
        table.string('email').notNullable();
        table.string('tipo').notNullable();

        table.timestamp('created_at')
            .defaultTo(knex.raw('CURRENT_TIMESTAMP'))
            .notNullable();
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('usuarios');
}