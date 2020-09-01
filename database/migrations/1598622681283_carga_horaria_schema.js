"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CargaHorariaSchema extends Schema {
  up() {
    this.create("carga_horarias", (table) => {
      table.increments();

      table.string("disciplina");
      table.integer("carga_horaria");
      table
        .integer("curso_id")
        .unsigned()
        .references("id")
        .inTable("cursos")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("carga_horarias");
  }
}

module.exports = CargaHorariaSchema;
