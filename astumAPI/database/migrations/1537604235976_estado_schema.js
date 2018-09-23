'use strict'

const Schema = use('Schema')

class EstadoSchema extends Schema {
  up () {
    this.create('estados', (table) => {
      table.increments('UF_ID')
      table.string('UF_NOME', 60)
      table.string('UF_UF', 2)
      table.integer('UF_IBGE', 2)
      table.integer('UF_SL', 3)
      table.string('UF_DDD', 50)
      table.timestamps()
    })
  }

  down () {
    this.drop('estados')
  }
}

module.exports = EstadoSchema
