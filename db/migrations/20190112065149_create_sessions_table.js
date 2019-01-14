exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(tbl) {
  	tbl.increments()

  	tbl
  		.string('session_name', 128)
  		.notNullable()

  	tbl
  		.integer('user_id')
  		.unsigned()
  		.notNullable()
  		.references('id')
  		.inTable('users')
      .onDelete('CASCADE')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('sessions')
};