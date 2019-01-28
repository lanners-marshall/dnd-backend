exports.up = function(knex, Promise) {
  return knex.schema.createTable('encounters', function(tbl) {
    tbl.increments()

    tbl
      .string('encounter_name', 128)
      .notNullable()

    tbl
      .integer('session_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('sessions')
      .onDelete('CASCADE')

    tbl
      .specificType('keys', 'text ARRAY')

    tbl
      .specificType('values', 'text ARRAY')

  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('encounters')
};