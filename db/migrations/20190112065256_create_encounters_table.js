let uuid = require('uuid-v4')

exports.up = function(knex, Promise) {
  return knex.schema.createTable('encounters', function(tbl) {

  	tbl.uuid('id').primary().defaultTo(uuid())

  	tbl
  		.string('encounter_name', 128)
  		.notNullable()

  	tbl
  		.string('session_id')
      .unsigned()
      .notNullable()
  		.references('id')
  		.inTable('sessions')
      .onDelete('CASCADE')

    tbl
      .string('monsters')
      .notNullable()

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('encounters')
};