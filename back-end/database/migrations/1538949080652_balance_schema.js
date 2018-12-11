'use strict'

const Schema = use('Schema')

class BalanceSchema extends Schema {
  up () {
    this.create('balances', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('status').notNullable()
      table.decimal('value').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('balances')
  }
}

module.exports = BalanceSchema
