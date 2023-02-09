import Knex from 'knex';

export async function up(knex: Knex) {
    return knex.schema.createTable('pets', table => {
        table.increments('id').primary();

        table.string('nome').notNullable();
        table.string('raca').notNullable();
        table.string('foto').notNullable();
        table.string('bio').notNullable();

        table.integer('usuarioId')
            .notNullable()
            .references('id')
            .inTable('usuarios')
            .onUpdate('CASCADE')
            .onDelete('CASCADE');
    });
}

export async function down(knex: Knex) {
    return knex.schema.dropTable('pets');
}