"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConfiguracoesSchema extends Schema {
  up() {
    this.create("configuracoes", (table) => {
      table.increments();
      table.string("telefone_wpp");
      table.string("facebook_url");
      table.string("pos_grad_url");
      table.decimal("pos_grad_valor_matricula");
      table.string("cur_prof_url");
      table.decimal("cur_prof_valor_matricula");

      table.timestamps();
    });
  }

  down() {
    this.drop("configuracoes");
  }
}

module.exports = ConfiguracoesSchema;
