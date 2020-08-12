"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConfiguracoesSchema extends Schema {
  up() {
    this.create("configuracoes", (table) => {
      table.increments();
      table.string("telefone_wpp");
      table.string("pos_grad_url");
      table.string("cur_prof_url");

      table.timestamps();
    });
  }

  down() {
    this.drop("configuracoes");
  }
}

module.exports = ConfiguracoesSchema;
