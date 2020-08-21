"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CursoSchema extends Schema {
  up() {
    this.create("cursos", (table) => {
      table.increments();

      table.string("nome").notNullable();
      table.string("sobre").notNullable();
      table.string("instituicao").notNullable();
      table.string("tipo").notNullable();
      table.string("duracao").notNullable();

      table
        .integer("area_estudo_id")
        .unsigned()
        .references("id")
        .inTable("area_estudos");

      table
        .integer("modalidade_id")
        .unsigned()
        .references("id")
        .inTable("modalidades");

      table.timestamps();
    });
  }

  down() {
    this.drop("cursos");
  }
}

module.exports = CursoSchema;
