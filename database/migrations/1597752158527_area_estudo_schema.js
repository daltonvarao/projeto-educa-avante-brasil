"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class AreaEstudoSchema extends Schema {
  up() {
    this.create("area_estudos", (table) => {
      table.increments();
      table.string("nome").unique().notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("area_estudos");
  }
}

module.exports = AreaEstudoSchema;
