"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Curso extends Model {
  static boot() {
    super.boot();

    this.addHook("afterFind", async (cursoInstance) => {
      const ch_total = await cursoInstance
        .carga_horarias()
        .getSum("carga_horaria");

      cursoInstance.ch_total = ch_total;
    });
  }

  area_estudo() {
    return this.belongsTo("App/Models/AreaEstudo");
  }

  carga_horarias() {
    return this.hasMany("App/Models/CargaHoraria");
  }

  forma_pagamentos() {
    return this.hasMany("App/Models/FormaPagamento");
  }
}

module.exports = Curso;
