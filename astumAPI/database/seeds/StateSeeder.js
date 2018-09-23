'use strict'

/*
|--------------------------------------------------------------------------
| StateSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

const Factory = use('Factory')
const Database = use('Database');

class StateSeeder {
  async run () {
    const states = await Database.table('states');
    console.log(states,'states');
  }
}

module.exports = StateSeeder
