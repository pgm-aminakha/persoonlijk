
const tableName = "users";

export function up(knex) {
    return knex.schema.createTable(tableName, function (table) {
        table.increments("id");
        table.string("firstname").notNullable();
        table.string("lastname").notNullable();
        table.string("email").notNullable().unique();
        table.string("password").notNullable();
        table.timestamps(true, true);
    });
}

export function down(knex) {
    return knex.schema.dropTable(tableName);
}