"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class PreMatricula extends Model {
  forma_pagamento() {
    return this.belongsTo("App/Models/FormaPagamento");
  }

  curso() {
    return this.belongsTo("App/Models/Curso");
  }
}

module.exports = PreMatricula;
