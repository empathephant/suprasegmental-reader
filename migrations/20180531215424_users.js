
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.integer('class_id');
        }),
    ]);
};

exports.down = function(knex, Promise) {
    return Promise.all([
        knex.schema.table('users', function (table) {
            table.dropColumn('priority');
        }),
    ]);
};
