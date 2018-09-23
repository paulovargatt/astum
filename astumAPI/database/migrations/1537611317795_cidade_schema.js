'use strict'

const Schema = use('Schema')

class CidadeSchema extends Schema {
  up () {
    this.create('cidades', (table) => {
      table.increments('CT_ID', 11)
      table.string('CT_NOME', 120)
      table.integer('CT_UF', 2)
      table.integer('CT_IBGE', 7)
      table.timestamps()
    })
  }

  down () {
    this.drop('cidades')
  }
}

module.exports = CidadeSchema
