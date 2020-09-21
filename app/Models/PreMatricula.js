"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PreMatricula extends Model {
  static get dates() {
    return super.dates.concat(["data_nascimento", "data_expedicao_rg"]);
  }

  static castDates(field, value) {
    if (this.dates.includes(field)) {
      return value.format("DD/MM/YYYY");
    }

    return super.formatDates(field, value);
  }

  forma_pagamento() {
    return this.belongsTo("App/Models/FormaPagamento");
  }

  curso() {
    return this.belongsTo("App/Models/Curso");
  }
}

module.exports = PreMatricula;
