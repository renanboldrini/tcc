'use strict'

const Schema = use('Schema')

class PropertySchema extends Schema {
  up () {
    this.create('properties', table => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('descripition').notNullable()
      table.date('date').notNullable()
      table.string('category').notNullable()
      table.decimal('value').notNullable()
      table.string('status').notNullable()      
      table.timestamps()
    })
  }

  down () {
    this.drop('properties')
  }
}

module.exports = PropertySchema