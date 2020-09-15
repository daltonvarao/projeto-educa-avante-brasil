"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

class PreMatriculaSchema extends Schema {
  up() {
    this.create("pre_matriculas", (table) => {
      table.increments();

      table.string("step");
      table.string("nome");
      table.string("email");
      table.string("telefone");
      table.enu("sexo", ["Masculino", "Feminino"]);
      table.string("estado_civil");
      table.string("data_nascimento");
      table.string("estado_nascimento");
      table.string("cidade_nascimento");
      table.string("nome_mae");
      table.string("nome_pai");
      table.string("cpf");
      table.string("rg");
      table.string("data_expedicao_rg");
      table.string("orgao_emissor_rg");
      table.string("uf_rg");
      table.enu("colou_grau", ["Sim", "Não"]);
      table.string("cep");
      table.string("rua");
      table.string("numero");
      table.string("bairro");
      table.string("cidade");
      table.string("estado");
      table.boolean("viewed").defaultTo(false);
      table.boolean("completed").defaultTo(false);

      table
        .integer("forma_pagamento_id")
        .unsigned()
        .references("id")
        .inTable("forma_pagamentos")
        .onDelete("SET NULL");

      table
        .integer("curso_id")
        .unsigned()
        .references("id")
        .inTable("cursos")
        .onDelete("SET NULL");

      table.timestamps();
    });
  }

  down() {
    this.drop("pre_matriculas");
  }
}

module.exports = PreMatriculaSchema;
