exports.up = knex => knex.schema.createTable("moviesTags", table => {
    table.increments("id");
    table.text("name");
    table.integer("user_id").references("id").inTable("users");
    table.integer("moviesNotes_id").references("id").inTable("moviesNotes");

});


exports.down = knex => knex.schema.dropTable("moviesTags");
