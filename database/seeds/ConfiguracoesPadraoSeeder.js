"use strict";

/*
|--------------------------------------------------------------------------
| ConfiguracoesPadraoSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Configuracao = use("App/Models/Configuracao");

class ConfiguracoesPadraoSeeder {
  async run() {
    await Configuracao.findOrCreate({ id: 1 }, {});
  }
}

module.exports = ConfiguracoesPadraoSeeder;
