"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class FormaPagamento extends Model {
  static boot() {
    super.boot();

    this.addHook("beforeSave", async (pg) => {
      pg.valor_total = pg.parcelas * pg.valor_parcela;
      pg.valor_liquido = pg.valor_total * (1 - (pg.desconto || 100 / 100));
    });
  }

  curso() {
    return this.belongsTo("App/Models/Curso");
  }
}

module.exports = FormaPagamento;
