"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class CursoFormaPagamentoSchema extends Schema {
  up() {
    this.create("curso_forma_pagamento", (table) => {
      table.increments();
      table.decimal("valor_parcela").defaultTo(0.0);
      table.decimal("desconto").defaultTo(0.0);

      table.decimal("valor_liquido").defaultTo(0.0);
      table.decimal("valor_total").defaultTo(0.0);

      table
        .integer("curso_id")
        .unsigned()
        .references("id")
        .inTable("cursos")
        .onDelete("CASCADE");

      table
        .integer("forma_pagamento_id")
        .unsigned()
        .references("id")
        .inTable("forma_pagamentos")
        .onDelete("CASCADE");

      table.timestamps();
    });
  }

  down() {
    this.drop("forma_pagamentos");
  }
}

module.exports = FormaPagamentosSchema;
