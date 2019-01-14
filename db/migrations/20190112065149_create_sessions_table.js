let uuid = require('uuid-v4')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(tbl) {
  	tbl.uuid('id').defaultTo(uuid())

  	tbl
  		.string('session_name', 128)
  		.notNullable()

  	tbl
  		.string('user_id')
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