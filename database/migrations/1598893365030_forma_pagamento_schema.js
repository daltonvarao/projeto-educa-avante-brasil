"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class FormaPagamentoSchema extends Schema {
  up() {
    this.create("forma_pagamentos", (table) => {
      table.increments();
      table.integer("parcelas").defaultTo(1);
      table.decimal("desconto").defaultTo(0.0);
      table.string("conclusao");
      table.enu("tipo", ["cartao", "boleto"]);
      table.timestamps();
    });
  }

  down() {
    this.drop("forma_pagamentos");
  }
}

module.exports = FormaPagamentoSchema;
