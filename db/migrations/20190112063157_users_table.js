let uuid = require('uuid-v4')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(tbl) {
  	tbl.uuid('id').defaultTo(uuid())

  	tbl
  		.string('username', 128)
  		.notNullable()
  		.unique('username')

    tbl
      .string('email', 128)
      .notNullable()
      .unique('email')

  	tbl
  		.string('password', 128)
  		.notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};