'use strict'

const Schema = use('Schema')

class ProfileSchema extends Schema {
  up () {
    this.create('profiles', (table) => {
      table.increments('id',11).unsigned()
      table.enu('sexo', ['masculino', 'feminino'])
      table.string('foto')
      table.text('desc')
      table.integer('pais_id', 11).unsigned().references('SL_ID').inTable('pais').onDelete('cascade')

      table.integer('UF_ID', 11).unsigned().references('UF_ID').inTable('estados')
      table.integer('city_id', 11).unsigned().references('ct_id').inTable('cidades')

      table.integer('user_id').unsigned()
      table.foreign('user_id').references('users.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down () {
    this.drop('profiles')
  }
}

module.exports = ProfileSchema
