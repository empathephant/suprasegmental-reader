
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('users', function (table) {
            table.increments('user_id').primary();
            table.string('email');
            table.string('hash');
            table.string('username');
            table.string('first_name');
            table.string('last_name');
            table.string('user_type');
            table.dateTime('date_joined');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.dropTable('users'),
    ]);
};
