"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormaPagamentoSchema extends Schema {
  up() {
    this.create("forma_pagamentos", (table) => {
      table.increments();
      table.integer("parcelas").defaultTo(1);
      table.decimal("valor_parcela").defaultTo(0.0);
      table.decimal("desconto").defaultTo(0.0);
      table.string("conclusao");

      table
        .integer("curso_id")
        .unsigned()
        .references("id")
        .inTable("cursos")
        .onDelete("CASCADE");

      table.decimal("valor_liquido").defaultTo(0.0);
      table.decimal("valor_total").defaultTo(0.0);

      table.timestamps();
    });
  }

  down() {
    this.drop("forma_pagamentos");
  }
}

module.exports = FormaPagamentoSchema;
