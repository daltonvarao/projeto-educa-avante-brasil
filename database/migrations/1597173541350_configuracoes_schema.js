"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ConfiguracoesSchema extends Schema {
  up() {
    this.create("configuracoes", (table) => {
      table.increments();
      table.string("telefone").notNullable();
      table.string("sala_aula_url").notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("configuracoes");
  }
}

module.exports = ConfiguracoesSchema;
