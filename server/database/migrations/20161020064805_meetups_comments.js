exports.up = function(knex, Promise) {
    return knex.schema.createTable('meetups_comments', function(table) {
        table.increments('id');
        table.integer('comments_id').references('id').inTable('comments').onDelete('CASCADE');
        table.integer('meetups_id').references('id').inTable('meetups').onDelete('CASCADE');
        table.text('comment');
        table.integer('likes');
        table.dateTime('created_on');
        table.dateTime('updated_on');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('meetups_comments');
};
