
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('vocabulary', function (table) {
            table.increments('word_id').primary();
            table.string('headword');
            table.string('definitions');
            table.dateTime('date_added');
            table.integer('user_id').unsigned().notNullable().references('user_id').inTable('users');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('vocabulary'),
    ]);
};
