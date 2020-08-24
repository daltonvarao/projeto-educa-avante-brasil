"use strict";

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use("Model");

class AreaEstudo extends Model {
  cursos() {
    return this.hasMany("App/Models/Curso");
  }
}

module.exports = AreaEstudo;
