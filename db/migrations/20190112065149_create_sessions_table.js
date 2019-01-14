let uuid = require('uuid-v4')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('sessions', function(tbl) {
  	tbl.uuid('id').primary().defaultTo(uuid())

  	tbl
  		.string('session_name', 128)
  		.notNullable()

  	tbl
  		.uuid('user_id')
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