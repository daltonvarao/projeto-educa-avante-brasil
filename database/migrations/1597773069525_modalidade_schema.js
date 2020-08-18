"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class ModalidadeSchema extends Schema {
  up() {
    this.create("modalidades", (table) => {
      table.increments();
      table.string("nome").notNullable().unique();
      table.timestamps();
    });
  }

  down() {
    this.drop("modalidades");
  }
}

module.exports = ModalidadeSchema;
