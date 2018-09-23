'use strict'

const Schema = use('Schema')

class PaisSchema extends Schema {
  up () {
    this.create('pais', (table) => {
      table.increments('SL_ID')
      table.string('SL_NOME',60)
      table.string('SL_NOME_PT',60)
      table.string('SL_SIGLA',60)
      table.integer('SL_BACEN',5)
      table.timestamps()
    })
  }

  down () {
    this.drop('pais')
  }
}

module.exports = PaisSchema
