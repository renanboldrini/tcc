'use strict'

const Schema = use('Schema')

class BillsToPaySchema extends Schema {
  up () {
    this.create('bills_to_pays', (table) => {
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
    this.drop('bills_to_pays')
  }
}

module.exports = BillsToPaySchema
