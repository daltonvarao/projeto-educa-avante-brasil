"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class Curso extends Model {
  modalidade() {
    this.belongsTo("App/Models/Modalidade");
  }

  area_estudo() {
    this.belongsTo("App/Models/AreaEstudo");
  }
}

module.exports = Curso;
