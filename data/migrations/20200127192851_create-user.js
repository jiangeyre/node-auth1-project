
exports.up = function(knex) {
    return knex.schema.createTable('user', proj => {
        proj.increments();
        proj.text('username', 128)
            .unique()
            .notNullable();
        proj.decimal('password', 256)
            .notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('user');
};
